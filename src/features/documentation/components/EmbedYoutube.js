import React from "react";
import PropTypes from "prop-types";

const styles = theme => ({
    videoResponsive: {
        overflow: 'hidden',
        paddingBottom: 50,
        position: 'relative',
        height: 0
    },
    videoResponsive: {
        iframe: {
            left: 0,
            top: 0,
            height: 100,
            width: 100,
            position: 'absolute'
        }
    }
});

const EmbedYoutube = ({ embedId }) => (
    <div className="videoResponsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

EmbedYoutube.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default EmbedYoutube;