import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {addPost} from '../store/actions/post';

const noUser = 'Você precisa estar logado para adicionar imagens';

class AddPhoto extends Component {
  state = {
    image: null,
    comment: '',
  };

  componentDidUpdate = prevProps => {
    if (prevProps.loading && !this.props.loading) {
      this.setState({
        image: null,
        comment: '',
      });

      this.props.navigation.navigate('Feed');
    }
  };

  pickImage = () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return;
    }

    ImagePicker.showImagePicker(
      {
        title: 'Escolha a imagem',
        maxWidth: 800,
        maxHeight: 600,
      },
      res => {
        if (!res.didCancel) {
          this.setState({image: {uri: res.uri, base64: res.data}});
        }
      },
    );
  };

  save = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return;
    }

    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment,
        },
      ],
    });

    // this.setState({image: null, comment: ''});
    // this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhar uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={this.state.image} />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.pickImage}>
            <Text style={styles.buttonText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Algum comentário para a foto?"
            editable={this.props.name !== null}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment})}
          />
          <TouchableOpacity
            style={[
              styles.button,
              this.props.loading ? styles.buttonDisabled : null,
            ]}
            onPress={this.save}
            disabled={this.props.loading}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#eee',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    marginTop: 20,
    width: '90%',
  },
});

const mapStateToProps = ({user, posts}) => {
  return {
    name: user.name,
    email: user.email,
    loading: posts.isUploading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPhoto);
