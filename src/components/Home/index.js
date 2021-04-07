import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {
  getMovieList,
  increasePageCount,
  getLanguageApi,
  resetPageNumber,
  setIsLoading,
} from '../../Services/actions';
import {bindActionCreators} from 'redux';
import Filter from './Filter';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      boxView: false,
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.getMovieList(this.props.page, `popularity.desc`, 'Most Popular');

    this.props.getLanguageApi();
  }

  renderItem = ({item}) => {
    let lan;
    let genres1;

    try {
      lan = this.props.language.filter(
        (obj) => obj.iso_639_1 === item.original_language,
      );
    } catch {
      lan = [{english_name: 'waiting'}];
    }
    if (item.genre_ids.length > 0) {
      genres1 = item.genre_ids.map((id) => {
        return this.props.genres.filter((obj) => obj.id === id);
      });
    } else {
      genres1 = null;
    }
    return (
      <View style={styles.card}>
        <Image
          style={styles.poster}
          source={{
            uri: 'http://image.tmdb.org/t/p/w780//' + item.poster_path,
          }}
        />

        <View style={styles.rightCard}>
          <View>
            <Text style={[styles.txtColor, styles.normalTxtSize, styles.wrap]}>
              {item.title}
            </Text>
            <Text style={styles.txtColor}>
              {item.release_date.slice(0, 4)} | {lan[0].english_name}
            </Text>
            <Text style={styles.txtColor}>
              {genres1 != null
                ? genres1.length > 1
                  ? genres1[0][0].name + ',' + genres1[1][0].name
                  : genres1[0][0].name
                : ''}
            </Text>
          </View>
          <View>
            <View style={styles.end}>
              <Text style={[styles.txtColor, styles.normalTxtSize]}>
                {item.vote_average}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  renderItemBoxView = ({item}) => {
    return (
      <View style={styles.boxContainer}>
        <Image
          style={styles.posterBoxView}
          source={{
            uri: `http://image.tmdb.org/t/p/w780//${item.poster_path}`,
          }}
        />

        <Text style={[styles.txtColor, styles.normalTxtSize, styles.wrap]}>
          {item.title}
        </Text>
      </View>
    );
  };
  footer = () => {
    return (
      <ActivityIndicator
        animating={this.props.isLoading}
        color="#AAAAAA"
        size="large"
      />
    );
  };
  endReached = () => {
    this.props.setIsLoading(true);

    this.props.getMovieList(
      this.props.page + 1,
      this.props.sortType,
      this.props.category,
    );
  };
  setModalVisibility = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <View>
            <Text style={[styles.txtColor, styles.normalTxtSize]}>Home</Text>
          </View>
          <TouchableOpacity onPress={() => this.setModalVisibility(true)}>
            <Image
              style={styles.img}
              source={require('../../assets/filter.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.header, styles.title]}>
          <View>
            <Text style={[styles.txtColor, styles.boldTxtSize]}>
              {this.props.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.setState({boxView: !this.state.boxView})}>
            <Image
              style={styles.img}
              source={require('../../assets/square.png')}
            />
          </TouchableOpacity>
        </View>
        {!this.state.boxView ? (
          <FlatList
            data={this.props.data}
            bounces={false}
            key={1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderItem}
            ListFooterComponent={() => this.footer()}
            onEndReachedThreshold={0.9}
            onEndReached={this.endReached}
          />
        ) : (
          <FlatList
            data={this.props.data}
            bounces={false}
            key={2}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderItemBoxView}
            ListFooterComponent={() => this.footer()}
            onEndReachedThreshold={0.9}
            onEndReached={this.endReached}
          />
        )}
        <Modal
          animationType="slide"
          transparent="true"
          visible={this.state.modalVisible}>
          <Filter
            close={() => this.setModalVisibility(false)}
            currentSwitch={this.props.sortType}
          />
        </Modal>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMovieList: (page, sortType, category) =>
      dispatch(getMovieList(page, sortType, category)),
    increasePageCount: () => dispatch(increasePageCount()),
    setIsLoading: (set) => dispatch(setIsLoading(set)),
    resetPageNumber: () => dispatch(resetPageNumber()),
    getLanguageApi: () => dispatch(getLanguageApi()),
  };
  //   return bindActionCreators(
  //     {
  //       getMovieList,
  //       increasePageCount,
  //       setIsLoading,
  //       resetPageNumber,
  //     },
  //     dispatch,
  //   );
};
const mapStateToProps = (state) => {
  return {
    page: state.Movie.page,
    data: state.Movie.data,
    title: state.Movie.category,
    isLoading: state.Movie.isLoading,
    language: state.Movie.language,
    genres: state.Movie.genre,
    sortType: state.Movie.sortType,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
