
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    PickerIOS,
    Dimensions
} = ReactNative;

var PickerItemIOS = PickerIOS.Item;

var SCREEN_WIDTH = Dimensions.get('window').width;

var Component = React.createClass({
    show: function(){
        this.setState({modalVisible: true});
    },
    getInitialState: function(){
        return {
            options: this.props.options,
            labels: this.props.labels || this.props.options,
            color: this.props.color || '#007AFF',
            modalVisible: false,
            selectedOption: this.props.options[0]
        };
    },
    hide: function() {
        this.setState({modalVisible: false});
    },
    render: function() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.basicContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.tapToClose} onPress={this.hide}></TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={this.hide}>
                                <Text style={{color:this.state.color}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                    if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption);
                                    this.setState({modalVisible: false});
                                }}>
                                <Text style={{color:this.state.color}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainBox}>
                            {/*Model body*/}
                            <PickerIOS
                                ref={'picker'}
                                style={styles.bottomPicker}
                                selectedValue={this.state.selectedOption}
                                onValueChange={(option) => this.setState({selectedOption: option})}
                            >
                                {this.state.options.map((option, i) => {
                                    var label = this.state.labels[i] || option;
                                    return (
                                        <PickerItemIOS
                                            key={option}
                                            value={option}
                                            label={label}
                                            key={option}
                                        />
                                    )
                                })}
                            </PickerIOS>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
});

var styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0,
        backgroundColor: '#F5FCFF',
    },
    buttonView:{
        width:SCREEN_WIDTH,
        padding: 8,
        borderTopWidth:0.5,
        borderTopColor:'lightgrey',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    mainBox: {
    },
    tapToClose: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    }
});

module.exports = Component;
