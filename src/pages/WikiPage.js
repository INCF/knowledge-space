import React, { Component } from 'react'
import { findSlugByCurie } from 'clients/EntityClient'
import { Redirect } from 'react-router'
import Entity from 'features/entity/Entity'
export default class WikiPage extends Component {

  state = { curie: null, slug: null }

  getSlugFromParamIfApplicable = () => {
    const fullUrl = window.location.href.split('/');
    const lastSection = fullUrl.pop() || fullUrl.pop();
    const splittedSection = lastSection.split("#");
    if (splittedSection && splittedSection.length && splittedSection[1]) {
      return splittedSection[1]  // we already have the updated url
    }
    return false;
  }

  componentDidMount() {
    console.debug("landed here curie??");
    const { curie } = this.props.match.params;
    console.debug(curie);
    const slug = this.getSlugFromParamIfApplicable(curie);
    if (slug) {
      console.debug("returned slug is");
      console.debug(slug);
      this.setState({ slug, curie })
    } else {
      console.debug(curie);
      findSlugByCurie(curie).then(function (slug) { this.setState({ slug, curie }) }.bind(this));
    }
  }

  render() {
    const { curie } = this.props.match.params;
    const { slug } = this.state;
    console.debug("check in render");
    console.debug(curie);
    console.debug(slug);
    if (slug && curie == this.state.curie) {
      // return (<Redirect to={`/wiki/${slug}`} />)
      return (<Entity slug={slug} />)
    } else { return null }
  }

}
