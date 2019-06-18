import { StyleSheet } from "react-native"

export const LoginStyles = StyleSheet.create({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  form: {
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  facebookIcon: {
    fontSize: 18,
    color: 'white',
  },  
  googleIcon: {
    fontSize: 18,
    color: 'white'
  },
  label: {
    width: '100%',
    color: '#f54300',
    marginBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold'
  },
  loginButton: {
    backgroundColor: '#ff4d00',
    display: 'flex',
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 0,
    justifyContent: 'center',
    marginTop: 30
  },
  bottomButtonsText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Bold'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold'
  },
  outsideTextUp: {
    color: '#999',
    width: '100%',
    fontSize: 18,
    paddingTop: 40,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold'
  },
  outsideTextBottom: {
    color: '#999',
    width: '100%',
    fontSize: 16,
    paddingBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold'
  },
  signUpButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#ffae00',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
    justifyContent: 'center',
    height: 40,
    width: '33.33%'
  },
  facebookButton: {
    backgroundColor: '#3a5896',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 0,
    justifyContent: 'center',
    height: 40,
    width: '33.33%'
  }, 
  googleButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#d93025',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
    paddingLeft: 5,
    justifyContent: 'center',
    height: 40,
    width: '33.33%'
  }, 
  item: {
    width: '100%',
    borderWidth: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: 'transparent'
  },
  input: {
    width: '100%',
    paddingLeft: 10,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff'
  }
});
