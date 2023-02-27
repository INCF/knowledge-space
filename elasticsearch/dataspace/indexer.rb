require 'elasticsearch'
require 'date'

def check_date(date)
  begin
    date.strip.length > 4 
  rescue ArgumentError
    return false
  end
end

client = Elasticsearch::Client.new( url: 'http://192.168.52.1:9200', log: true) 
indexes = client.cat.indices.each_line.map { |l| l.split(' ')[2] }

Dir.glob('export/*').each do |source|
  index = source.split("/")[1].downcase.gsub('-', '_')
  if indexes.include?(index)   
    client.indices.delete index: index
  end 
  client.indices.create index: index, body: IO.read('mappings.json')
end

Dir.glob('export/**/*.json').each do |file|
  index = file.split("/")[1].downcase.gsub('-', '_')
  json = JSON.parse(IO.read(file))
  id = json.dig('id') || json.dig('e_uid')
  id.chomp!
  id.strip!
  next if id.length == 0
  if id.bytesize < 500

    if date = json.dig('dc', 'date')
      json['dc'].delete('date') unless check_date(date)
    end
    json.keys.select { |k| k.include?('_date') }.each do |key|
      json.delete(key) unless check_date(json[key])
    end

    index = File.dirname(file).split('/').last.downcase.gsub('-', '_')
    client.index index: index,  type: 'dataSpace', id: id, body: json.to_json
  else
    puts file
  end
end

