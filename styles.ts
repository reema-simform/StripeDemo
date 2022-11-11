import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
    prePaidContainerStyle: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    itemView: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'space-between',
        width: 104,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },
    itemSelected: {
        backgroundColor: '#BAA8EE',
        borderColor: '#BAA8EE'
    },
    buttonView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: Platform.OS === 'ios' ? 5 : 25,
        marginHorizontal: Platform.OS === 'ios' ? 0 : undefined,
        backgroundColor: 'black',
        width: 250
    },
    buttonText: {
        color: 'white'
    },
    buttonContainer: {
        marginVerticle: 10
    },
    cardStyle: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 6,
        placeholderColor: 'white',
        cursorColor: 'white',
        textColor: 'white'
      },
      selectedCardStyle: {
        backgroundColor: 'transparent',
        borderColor: 'grey',
        placeholderColor: 'transparent',
        cursorColor: 'grey',
        textColor: 'white'
      },
      cardFieldStyle: {
        height: 70,
        marginHorizontal: 10,
        backgroundColor: 'white'
      },

});

export default styles;
