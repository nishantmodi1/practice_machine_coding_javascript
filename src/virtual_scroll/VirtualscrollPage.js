import logo from './logo.svg';
import './App.css';
import VirtualScroll from './VirtualScroll';

function VirtualscrollPage() {
  const items = Array.from({length: 1000}, (_, i) => ({id:i, name: `Item ${i}`}))
  console.log(items)
  return (
    <div className="App" style={{display:'flex',flexDirection: 'column', justifyContent:'center', alignItems: 'center', width:'100%', margin:'auto' }}>
      <h2>Virtual Scrolling Component</h2>
      <VirtualScroll
        items={items} 
        itemHeight={50} 
        containerHeight={300}
      />
    </div>
  );
}

export default VirtualscrollPage;
