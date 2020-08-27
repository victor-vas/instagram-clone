import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {addComment} from '../store/actions/post';

const initialState = {
  comment: '',
  editMode: false,
};

class AddComment extends Component {
  state = {
    ...initialState,
  };

  handleAddComment = () => {
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment,
      },
    });

    this.setState({...initialState});
  };

  render() {
    if (this.state.editMode) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Pode comentar..."
            autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment})}
            onSubmitEditing={this.handleAddComment}
          />
          <TouchableWithoutFeedback
            onPress={() => this.setState({editMode: false})}>
            <Icon name="times" size={15} color="#555" />
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({editMode: true})}>
          <View style={styles.container}>
            <Icon name="comment-o" size={25} color="#555" />
            <Text style={styles.caption}>Adicione um comentário...</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#ccc',
  },
  input: {
    width: '90%',
  },
});

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: payload => dispatch(addComment(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddComment);
