import React, {Component} from 'react';
import {Text, StyleSheet, View, Switch, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getMovieList} from '../../Services/actions';
import {styles} from './styles';
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      byRealease: false,
      byOld: false,
      byMostPopular: false,
      byLessPopular: false,
      byHighRevenue: false,
      byLowRevenue: false,
    };
  }
  componentDidMount() {
    this.startSwitchOn();
  }
  startSwitchOn = () => {
    switch (this.props.currentSwitch) {
      case 'release_date.desc':
        this.setState({byRealease: true});
        break;
      case 'popularity.desc':
        this.setState({byMostPopular: true});
        break;
      case 'release_date.asc':
        this.setState({byOld: true});
        break;
      case 'popularity.asc':
        this.setState({byLessPopular: true});
        break;
      case 'revenue.desc':
        this.setState({byHighRevenue: true});
        break;
      case 'revenue.asc':
        this.setState({byLowRevenue: true});
        break;
      default:
        null;
    }
  };
  onPress = () => {
    let sortType;
    let type;
    if (this.state.byRealease) {
      sortType = 'release_date.desc';
      type = 'Relases';
    } else if (this.state.byOld) {
      sortType = 'release_date.asc';
      type = 'Old';
    } else if (this.state.byMostPopular) {
      sortType = 'popularity.desc';
      type = 'Most Popular';
    } else if (this.state.byLessPopular) {
      sortType = 'popularity.asc';
      type = 'Less Popular';
    } else if (this.state.byHighRevenue) {
      sortType = 'revenue.desc';
      type = 'Higher Revenue';
    } else if (this.state.byLowRevenue) {
      sortType = 'revenue.asc';
      type = 'Lower Revenue';
    }

    this.props.getMovieList(1, sortType, type);
    this.props.close();
  };

  render() {
    const {
      byRealease,
      byOld,
      byMostPopular,
      byLessPopular,
      byHighRevenue,
      byLowRevenue,
    } = this.state;
    return (
      <View style={styles.filterContainer}>
        <Text
          style={[styles.txtColor, styles.normalTxtSize, styles.centerAlign]}>
          Filter
        </Text>
        <Text style={[styles.txtColor, styles.normalTxtSize]}>Date</Text>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>Releases</Text>
          <Switch
            value={byRealease}
            onValueChange={(value) => {
              this.setState({
                byRealease: value,
                byOld: false,
                byMostPopular: false,
                byLessPopular: false,
                byHighRevenue: false,
                byLowRevenue: false,
              });
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>Old</Text>
          <Switch
            value={byOld}
            onValueChange={(value) =>
              this.setState({
                byOld: value,
                byRealease: false,
                byMostPopular: false,
                byLessPopular: false,
                byHighRevenue: false,
                byLowRevenue: false,
              })
            }
          />
        </View>
        <Text style={[styles.txtColor, styles.normalTxtSize]}>Popularity</Text>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>
            Most popular
          </Text>
          <Switch
            value={byMostPopular}
            onValueChange={(value) =>
              this.setState({
                byMostPopular: value,
                byOld: false,
                byRealease: false,
                byLessPopular: false,
                byHighRevenue: false,
                byLowRevenue: false,
              })
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>
            Less popular
          </Text>
          <Switch
            value={byLessPopular}
            onValueChange={(value) =>
              this.setState({
                byLessPopular: value,
                byOld: false,
                byRealease: false,
                byMostPopular: false,
                byHighRevenue: false,
                byLowRevenue: false,
              })
            }
          />
        </View>
        <Text style={[styles.txtColor, styles.normalTxtSize]}>Date</Text>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>
            Higher revenue
          </Text>
          <Switch
            value={byHighRevenue}
            onValueChange={(value) =>
              this.setState({
                byHighRevenue: value,
                byOld: false,
                byRealease: false,
                byMostPopular: false,
                byLessPopular: false,
                byLowRevenue: false,
              })
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.txtColor, styles.normalTxtSize]}>
            Lowest revenue
          </Text>
          <Switch
            value={byLowRevenue}
            onValueChange={(value) =>
              this.setState({
                byLowRevenue: value,
                byOld: false,
                byRealease: false,
                byMostPopular: false,
                byLessPopular: false,
                byHighRevenue: false,
              })
            }
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.onPress()}>
          <Text
            style={[styles.txtColor, styles.normalTxtSize, styles.centerAlign]}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovieList: (page, sortType, type) =>
    dispatch(getMovieList(page, sortType, type)),
});

export default connect(null, mapDispatchToProps)(Filter);
