
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

 render() {
    const item = this.props.item;
    var imageButton;
    if (item.thumbnail == "" || item.thumbnail.indexOf('feedburner') != -1) {
      imageButton = <Image style={styles.thumb}  source={require('./Resources/Unknown.png')} />
    } else {
      imageButton = <Image style={styles.thumb} source={{ uri: item.thumbnail }} />
    }
    return (
        <View>
          <View style={styles.rowContainer}>
            {imageButton}
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{item.title}</Text>
              <Text style={styles.description}
                numberOfLines={3}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
    );
  }
}

export default class ListPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('http://pulse.zerodha.com/feed.php');
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data:  res.items,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({isLoading: false });
      });
  };


  _renderItem = (feedItem) => {
    const { item, index } = feedItem;
    return (
    <ListItem
      item={item}
      index={index}
    />
    );
  };


  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.guid}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#000000'
  },
  description: {
    fontSize: 13,
    color: '#000000'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});