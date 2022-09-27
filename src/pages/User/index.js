import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class Use extends Component {

  // adding options and title into a page
  //
  // different from 'Main Component', when we need get a parameter
  // we have to set 'navigationOptions' as a function
  static navigationOptions = ({ navigation }) => ({
    title: nagivation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  // loading datas on the page
  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);
    //const response = await api.get(`/users/${user.login}/starred?page=2`);

    this.setState({ stars: response.data });
  }

  render () {
    const { navigation } = this.props;
    const { stars } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>

        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />

      </Container>
    );
  }
}
