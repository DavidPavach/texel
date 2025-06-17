const CryptoWidget = () => {
  return (
    <div style={{
      height: '62px',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      boxSizing: 'border-box',
      border: '1px solid #56667F',
      borderRadius: '4px',
      textAlign: 'right',
      lineHeight: '14px',
      fontSize: '12px',
      fontFeatureSettings: 'normal',
      textSizeAdjust: '100%',
      boxShadow: 'inset 0 -20px 0 0 #FFC107',
      padding: '0px',
      margin: '0px',
      width: '100%',
    }}>
      <div style={{
        height: '40px',
        padding: '0px',
        margin: '0px',
        width: '100%',
      }}>
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover="
          width="100%"
          height="36px"
          scrolling="auto"
          frameBorder="0"
          style={{ border: '0', margin: '0', padding: '0' }}
        ></iframe>
      </div>
      <div style={{
        color: '#000',
        lineHeight: '14px',
        fontWeight: '400',
        fontSize: '11px',
        boxSizing: 'border-box',
        padding: '2px 6px',
        width: '100%',
        fontFamily: 'Verdana, Tahoma, Arial, sans-serif',
      }}>
          Cryptocurrency Prices
      </div>
    </div>
  );
};

export default CryptoWidget;
