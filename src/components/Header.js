import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import {Gravatar} from 'react-native-gravatar';

import icon from '../../assets/imgs/icon.png';

class Header extends Component {
  render() {
    const name = this.props.name || 'Anônimo';
    const gravatar = this.props.email ? (
      <Gravatar
        style={styles.avatar}
        options={{email: this.props.email, secure: true}}
      />
    ) : null;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image style={styles.image} source={icon} />
          <Text style={styles.title}>Lambe Lambe</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.user}>{name}</Text>
          {gravatar}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#000',
    fontFamily: 'shelter',
    fontSize: 28,
    height: 30,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontSize: 10,
    color: '#888',
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
    email: user.email,
  };
};

export default connect(mapStateToProps)(Header);
