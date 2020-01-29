/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Button, Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
Icon1.loadFont();

Geocoder.init('AIzaSyBy8gzOEnYejEJLzTxxGSq3DSPKZi4K3Ac');

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class DetailsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  componentDidMount() {
    const details = this.props.details;
    Geocoder.from(details.latitude, details.longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        this.setState({address: addressComponent.long_name});
      })
      .catch(error => console.warn(error));
  }
  onRefresh() {
    this.setState({isFetching: true});
  }
  showCalendar(details) {
    let timezone = '';
    if (details.timeZoneOffset < 0) {
      timezone = details.timeZoneOffset + ':00';
    } else {
      timezone = '+' + details.timeZoneOffset + ':00';
    }
    return (
      details.day +
      '/' +
      details.month +
      '/' +
      details.year +
      ' ' +
      details.hour +
      ':' +
      details.minute +
      ':' +
      details.second +
      ' UTC ' +
      timezone
    );
  }
  showFileSize(details) {
    let size = details.fileSize / 1024 / 1024;
    if (size < 0.1) {
      size = size.toFixed(2) + ' KB';
    } else {
      size = size.toFixed(2) + ' MB';
    }
    return size;
  }
  render() {
    const details = this.props.details;
    return (
      <View style={styles.modalView}>
        <Image source={{uri: details.thumbnail}} style={styles.thumbnailImg} />
        <View style={styles.subView}>
          <View style={styles.itemView}>
            <Icon name="dedent" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={styles.label1}>Camera ID</Text>
              <Text style={styles.label2}>{details.cameraModel}</Text>
            </View>
          </View>
          <View style={styles.itemView}>
            <Icon name="calendar" size={30} color="white" />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.label1}>Date Time Zone</Text>
              <Text style={styles.label2}>{this.showCalendar(details)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.subView}>
          <View style={styles.itemView}>
            <Icon name="desktop" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={styles.label1}>Resolution</Text>
              <Text style={styles.label2}>
                {details.resolutionX}x{details.resolutionY}
              </Text>
            </View>
          </View>
          <View style={styles.itemView}>
            <Icon name="file-text-o" size={30} color="white" />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.label1}>File size</Text>
              <Text style={styles.label2}>{this.showFileSize(details)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.subView}>
          <View style={styles.itemView}>
            <Icon1 name="my-location" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={styles.label1}>GPS Location</Text>
              <Text style={styles.label2}>Latitude: {details.latitude}</Text>
              <Text style={styles.label2}>Longitude: {details.longitude}</Text>
            </View>
          </View>
          <View style={styles.itemView}>
            <Icon name="vcard-o" size={30} color="white" />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.label1}>Address (Approximate)</Text>
              <Text style={styles.label2}>{this.state.address?this.state.address:'N/A'}</Text>
            </View>
          </View>
        </View>
        <Button title="Hide modal" onPress={this.props.toggleModal} />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsDialog);

export const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'black',
    width: '90%',
    padding: 10,
  },
  label1: {
    fontSize: 12,
    color: '#ddd',
  },
  label2: {
    fontSize: 14,
    color: 'white',
  },
  thumbnailImg: {
    height: 100,
  },
  subView: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemView: {
    flexDirection: 'row',
    width: '50%',
  },
});
