import React, { Component, createRef } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'


class DagreGraph extends Component {
	svg = createRef()
	innerG = createRef()

	static defaultProps = {
		rankdir: 'TB',
		zoomable: false,
		fitBoundaries: false,
		className: 'dagre-d3-react',
		nodesep: 50,
		edgesep: 10,
		ranksep: 50,
	}
	componentDidMount() {
		this._drawChart()
	}
	componentDidUpdate() {
		this._resetChart();
		this._drawChart()
	}

	_getNodeData(id) {
		return this.props.nodes.find(node => node.id === id)
	}

	_resetChart() {
		const root = d3.select(this.svg.current);
		const innerG = d3.select(this.innerG.current);
		innerG.selectAll('g').remove();
		root.transition().call(this.zoom.transform,
			d3.zoomIdentity
				.translate(0, 0)
				.scale(1)
		);
	}

	getGraphBounds = () => {
		let x = Number.POSITIVE_INFINITY;
		let X = Number.NEGATIVE_INFINITY;
		let y = Number.POSITIVE_INFINITY;
		let Y = Number.NEGATIVE_INFINITY;
		let root = d3.select(this.svg.current)
		root.selectAll("g.node").each(function (id) {
			const bbox = this.getBBox();
			const element = d3.select(this);
			const string = element.attr("transform");
			const b = string.substring(string.indexOf("(") + 1, string.indexOf(")")).split(",");
			const v = b.map(function (item) {
				return parseInt(item, 10);
			});
			x = Math.min(x, v[0] - bbox.width / 2);
			X = Math.max(X, v[0] + bbox.width / 2);
			y = Math.min(y, v[1] - bbox.height / 2);
			Y = Math.max(Y, v[1] + bbox.height / 2);
		});
		return { x: x, X: X, y: y, Y: Y };
	}

	_zoomFit(paddingPercent = null, transitionDuration = null) {
		// let svg = d3.select(this.svg.current)
		let root = d3.select(this.svg.current)
		const parentBBox = this.svg.current.getBBox();
		console.debug(parentBBox);
		const b = this.getGraphBounds();
		console.debug("check graph bounds");
		console.debug(b);
		console.debug(parentBBox);
		const w = b.X - b.x, h = b.Y - b.y;
		const cw = 1200;//Number(parentBBox.width);
		const ch = 500//Number(parentBBox.height);
		let s = Math.min(cw / w, ch / h);
		if (s < 0.5) {
			// do nothing
			s = 0.5;
		}
		const tx = (-b.x * s + (cw / s - w) * s / 2), ty = (-b.y * s + (ch / s - h) * s / 2);
		// zoom.translate([tx, ty]).scale(s);
		console.debug("final");
		console.debug([tx, ty]);
		console.debug(s);
		root.transition()
			.duration(750)
			.call(this.zoom.transform,
				d3.zoomIdentity
					.translate(tx, ty)
					.scale(s)
			);
	}


	_drawChart = () => {
		let {
			nodes,
			links,
			zoomable,
			fitBoundaries,
			rankdir,
			nodesep,
			edgesep,
			ranksep,
			animate,
			shape,
			onNodeClick,
			onNodeRightClick,
			onNodeDoubleClick,
			onRelationshipClick,
			onRelationshipRightClick,
			onRelationshipDoubleClick
		} = this.props
		let g = new dagreD3.graphlib.Graph().setGraph({ rankdir, nodesep, edgesep, ranksep })

		nodes.forEach(node =>
			g.setNode(node.id, { label: node.label, class: node.class || '', labelType: node.labelType || 'string' })
		)

		if (shape) {
			g.nodes().forEach(v => (g.node(v).shape = shape))
		}

		links.forEach(link => g.setEdge(link.source, link.target, { label: link.label || '', class: link.class || '' }))

		let render = new dagreD3.render()
		let svg = d3.select(this.svg.current)
		let inner = d3.select(this.innerG.current)

		let zoom = d3.zoom().on('zoom', () => {
			// console.debug("check d3 event after zoom");
			// console.debug(d3.event.transform);
			inner.attr('transform', d3.event.transform)
		})
		this.zoom = zoom;
		// console.debug("check zoom");
		// console.debug(this.zoom);
		// debugger;
		if (zoomable) {
			svg.call(zoom)
		}
		if (animate) {
			g.graph().transition = function transition(selection) {
				return selection.transition().duration(animate || 1000)
			}
		}

		render(inner, g)

		if (fitBoundaries) {
			// let _initial_scale = 0.5
			// svg.call(
			// 	zoom.transform,
			// 	d3.zoomIdentity.translate((svg.attr('width') - g.graph().width * _initial_scale) / 2, 20).scale(_initial_scale)
			// )
			// svg.attr('height', g.graph().height * _initial_scale + 180)
			this._zoomFit();
		}

		if (onNodeClick) {
			svg.selectAll('g.node').on('click', (id) => {
				let _node = g.node(id)
				let _original = this._getNodeData(id)
				onNodeClick({ d3node: _node, original: _original })
			})
		}

		if (onNodeRightClick) {
			svg.selectAll('g.node').on('contextmenu', (id) => {
				let _node = g.node(id)
				let _original = this._getNodeData(id)
				onNodeRightClick({ d3node: _node, original: _original })
			})
		}
		if (onNodeDoubleClick) {
			svg.selectAll('g.node').on('dblclick', (id) => {
				let _node = g.node(id)
				let _original = this._getNodeData(id)
				onNodeDoubleClick({ d3node: _node, original: _original })
			})
		}

		if (onRelationshipClick) {
			svg.selectAll('g.edgeLabel').on('click', (id) => {
				let _source = g.node(id.w)
				let _original_source = this._getNodeData(id.w)

				let _target = g.node(id.v)
				let _original_target = this._getNodeData(id.v)
				onRelationshipClick({
					d3source: _source,
					source: _original_source,
					d3target: _target,
					target: _original_target
				})
			})
		}
		if (onRelationshipRightClick) {
			svg.selectAll('g.edgeLabel').on('contextmenu', (id) => {
				let _source = g.node(id.w)
				let _original_source = this._getNodeData(id.w)

				let _target = g.node(id.v)
				let _original_target = this._getNodeData(id.v)
				onRelationshipRightClick({
					d3source: _source,
					source: _original_source,
					d3target: _target,
					target: _original_target
				})
			})
		}
		if (onRelationshipDoubleClick) {
			svg.selectAll('g.edgeLabel').on('dblclick', (id) => {
				let _source = g.node(id.w)
				let _original_source = this._getNodeData(id.w)
				let _target = g.node(id.v)
				let _original_target = this._getNodeData(id.v)
				onRelationshipDoubleClick({
					d3source: _source,
					source: _original_source,
					d3target: _target,
					target: _original_target
				})
			})
		}
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height} ref={this.svg} className={this.props.className || ''}>
				<g ref={this.innerG} />
			</svg>
		)
	}
}

export default DagreGraph
