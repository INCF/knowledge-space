curl -X PUT "http://192.168.222.1:9200/scigraph" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 1,
    "analysis": {
      "analyzer": {
        "path_analyzer": {
          "tokenizer": "path_hierarchy"
        }
      }
    }
  },
  "mappings": {
    "entities": {
      "dynamic": false,
      "properties": {
        "suggestions": {
          "type": "completion"
        },
        "name": {
          "type": "text"
        },
        "labels": {
          "type": "text"
        },
        "synonyms": {
          "type": "text"
        },
        "curies": {
          "type": "keyword"
        },
        "slug": {
          "type": "keyword"
        },
        "curie_paths": {
	  "type": "text",
          "analyzer": "path_analyzer"
        },
        "human_paths": {
	  "type": "text",
          "analyzer": "path_analyzer"
        },
        "linked_path": {
	  "type": "object",
	  "enabled": false
        },
        "category": {
          "type": "keyword"
        },
        "summary": {
          "type": "text"
        },
        "definitions": {
          "type": "nested",
          "dynamic": false,
          "properties": {
            "tree": {
              "type": "object",
              "enabled": false
            },
            "abbreviations": {
              "type": "keyword"
            },
            "curie": {
              "type": "keyword"
            },
            "categories": {
              "type": "keyword"
            },
            "primary": {
              "type": "boolean"
            },
            "iri": {
              "type": "keyword"
            },
            "labels": {
              "type": "text"
            }
          }
        }
      }
    }
  }
}
'
