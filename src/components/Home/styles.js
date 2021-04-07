import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#191919',
  },
  txtColor: {
    color: '#AAAAAA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    borderBottomWidth: 2,
    borderColor: '#121212',
  },
  normalTxtSize: {
    fontWeight: '700',
    fontSize: 17,
  },
  boldTxtSize: {
    fontSize: 23,
    fontWeight: '400',
  },
  img: {
    height: 25,
    width: 25,
  },
  title: {
    borderBottomWidth: 0,
    padding: 10,
    marginTop: 8,
  },
  wrap: {
    flexWrap: 'wrap',
    flex: 1,
  },
  poster: {
    width: '40%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    marginVertical: 15,
  },
  rightCard: {
    width: '60%',
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  end: {
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 15,
    alignSelf: 'baseline',
  },
  boxContainer: {
    width: '50%',
    marginVertical: 10,
    alignItems: 'center',
  },
  posterBoxView: {
    width: '90%',
    height: 300,
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  centerAlign: {
    textAlign: 'center',
  },

  filterContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#202121',
    paddingHorizontal: 25,
    padding: 10,
    borderRadius: 10,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#555555',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
});
