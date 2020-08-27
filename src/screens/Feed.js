import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, FlatList, View} from 'react-native';

import {fetchPosts} from '../store/actions/post';
import Header from '../components/Header';
import Post from '../components/Post';

class Feed extends Component {
  componentDidMount = () => {
    this.props.OnFetchPosts();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Post key={item.id} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f5fcff',
  },
});

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    OnFetchPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
