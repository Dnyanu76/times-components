import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components/slice-layout";
import { TileA, TileB, TileU, TileAA } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneAndOne extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, support }
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={<TileA onPress={onPress} tile={lead} tileName="lead" />}
        support={<TileB onPress={onPress} tile={support} tileName="support" />}
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead, support }
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={
          <TileU
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead}
            tileName="lead"
          />
        }
        support={
          <TileAA
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support}
            tileName="support"
          />
        }
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
        renderWide={this.renderMedium}
        renderHuge={this.renderMedium}
      />
    );
  }
}

LeadOneAndOne.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadOneAndOne;
