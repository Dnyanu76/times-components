import React from "react";
import PropTypes from "prop-types";
import {
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileAE = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <WithoutWhiteSpace
      render={whiteSpaceHeight => (
        <TileSummary
          headlineStyle={styles.headline}
          summary={getTileSummary(tile, 800)}
          tile={tile}
          whiteSpaceHeight={whiteSpaceHeight}
          withStar={false}
          linesOfTeaserToRender={5}
        />
      )}
    />
    <PositionedTileStar articleId={tile.article.id} />
  </TileLink>
);

TileAE.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAE);
