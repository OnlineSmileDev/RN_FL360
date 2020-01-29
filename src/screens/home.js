import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import DetailsDialog from '../component/detailsDialog.js';
const customData = require('../asssets/dataset500.json');

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

class Home extends Component {
  constructor() {
    super();
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      index: 0,
      isFetching: false,
      modalVidisble: false,
      details: {},
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
  }
  onRefresh() {
    this.setState({isFetching: true});
  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.itemView}
        onPress={() => this.setState({modalVidisble: true, details: item})}>
        <Image style={styles.imageThumbnail} source={{uri: item.thumbnail}} />
      </TouchableOpacity>
    );
  };
  toggleModal = () => {
    this.setState({modalVidisble: !this.state.modalVidisble});
  };

  render() {
    console.disableYellowBox = true;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>All FL 360 Videos</Text>
        </View>
        <View style={styles.mainView}>
          <FlatList
            data={customData}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
            numColumns={this.state.orientation === 'portrait' ? 3 : 5}
            refreshing={this.state.isFetching}
            onRefresh={() => this.onRefresh()}
          />
        </View>
        <Modal
          style={{alignItems: 'center'}}
          isVisible={this.state.modalVidisble}
          backdropColor={'white'}
          backdropOpacity={0.7}>
          <DetailsDialog
            toggleModal={this.toggleModal}
            details={this.state.details}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 10,
  },
  titleView: {
    alignItems: 'center',
  },
  mainView: {
    flex: 1,
  },
  itemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
