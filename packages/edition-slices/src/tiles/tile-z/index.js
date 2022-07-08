/* eslint-disable react/require-default-props */
import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileZ = ({ onPress, tile, breakpoint = editionBreakpoints.wide }) => {
  const crop = getTileImage(tile, "crop32");
  const styles = styleFactory(breakpoint);

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TcView style={styles.summaryContainer}>
        <WithoutWhiteSpace
          render={whiteSpaceHeight => (
            <TileSummary
              headlineStyle={styles.headline}
              summary={getTileSummary(tile, 800)}
              summaryStyle={styles.summary}
              tile={tile}
              whiteSpaceHeight={whiteSpaceHeight}
              withStar={false}
            />
          )}
        />
      </TcView>

      <TileImage
        aspectRatio={3 / 2}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        hasVideo={hasVideo}
      />
    </TileLink>
  );
};

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileZ);
