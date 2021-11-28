import WebView from 'react-native-webview';

type PostMessage = 'onClickStorage' | 'setStep(1)' | 'requestPayment' | 'sendCoord';

const callWeb = ({ ref, action }: { ref: WebView; action: PostMessage }) => {
  console.log('app => web action: ', action);
  ref.postMessage(action);
};
export default callWeb;
