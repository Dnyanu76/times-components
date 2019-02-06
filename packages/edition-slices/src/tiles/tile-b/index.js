import React from "react";
import PropTypes from "prop-types";
import { TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileB = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      summary={tile.article.summary125}
      tile={tile}
    />
  </TileLink>
);

TileB.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileB;
