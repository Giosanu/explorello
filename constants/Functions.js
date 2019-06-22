import Toast from 'react-native-root-toast';


// Add a Toast on screen.
export const errorToast = (message) => Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: '#ed4337',
    textColor: '#fff',
    opacity: 1,
    textStyle: {fontFamily: 'Montserrat-SemiBold'},
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

export const successToast = (message) => Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: '#bfd74a',
    opacity: 1,
    textColor: '#fff',
    textStyle: {fontFamily: 'Montserrat-SemiBold'},
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

export const informativeToast = (message) => Toast.show(message, {
    duration: 4000,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: '#f9b332',
    opacity: 1,
    textColor: '#fff',
    textStyle: {fontFamily: 'Montserrat-SemiBold'},
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

