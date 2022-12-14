import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from './styles';

export default class Main extends Component {
  // adding options and title into a page
  static navigationOptions = {
    title: 'Users',
  };

  // properties' types
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  // inseerting the first data into 'users' state
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // updating 'users' state
  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    // console.tron.log(this.state.newUser); // log msg
    // console.tron.warning(this.state.newUser); // warning msg
    // console.tron.err(this.state.newUser); // error msg

    const { users, newUser } = this.state;

    // applications starts loading datas
    this.setState({ loading: true });

    const response = await api.get(`/Users/${newUser}`);

    // getting user's datas from GitHub
    const data = {
      name   : response.data.name,
      login  : response.data.login,
      bio    : response.data.bio,
      avatar : response.data.avatar_url,
    };

    // saving the new user and setting an empty string
    // into newUser state
    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false, // application stops loading datas
    });

    // hided the virtual keyboard afteer adding a new user
    Keyboard.dismiss();
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  }

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>

        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Add User!'
            value={newUser}
            onChangeText={text => this.setState({ newUser, text })}

            // changes the 'return/enter' key on phone virtual keyboard
            returnKeyType="send"

            // when pressing the 'return/enter' key, the user is added
            onSubmitEditing={this.handleAddUser}
          />

          {/** in React-Native we use 'onPress' and not 'onClick' */}
          <SubmitButton loading={loading} onPress={this.handleAddUser}>

            {/** if application is loading datas, an ActivityIndicator is
             * shown, else, just an Icon
             */}
            {loading ? (
                <ActivityIndicator color='#fff' />
            ) : (
                <Icon name='add' size={20} color='#fff' />

            )}
          </SubmitButton>
        </Form>


        <List
          data={users}
          keyExtractor={user => user.login}

          // each 'item' is a 'user'
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>See User's Profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />

      </Container>
    );
  }
}
