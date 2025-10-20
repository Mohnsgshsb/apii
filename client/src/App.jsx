import React, {useState} from 'react'

const apis = [
  { no: 1, name: 'Cek Tagihan Listrik (POST PAID)', method: 'GET', desc: 'Cek tagihan listrik (POST PAID)', params: 'apikey' },
  { no: 2, name: 'Check API Key', method: 'GET', desc: 'Get detail apikey', params: 'apikey' },
  { no: 3, name: 'Check Resi', method: 'GET', desc: 'Check resi number', params: 'apikey' },
  { no: 4, name: 'Domain Check', method: 'GET', desc: 'Search domain and price', params: 'apikey, query' },
  { no: 5, name: 'NSFW Check', method: 'GET, POST', desc: 'Check nsfw score (Premium / VIP only)', params: 'apikey, img' }
]

export default function App(){
  const [base, setBase] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function testSavetube(){
    if(!base) return alert('ضع رابط السيرفر أولاً، مثلاً: http://localhost:3333');
    const url = prompt('ضع رابط فيديو يوتيوب للاختبار (مثال: https://youtu.be/VIDEO_ID)');
    if(!url) return;
    setLoading(true);
    try{
      const resp = await fetch(`${base.replace(/\/+$/,'')}/api/savetube?url=${encodeURIComponent(url)}&format=720`);
      const data = await resp.json();
      setResult(data);
    }catch(e){
      setResult({ error: e.message });
    }finally{
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth:1000,margin:'40px auto',padding:24,background:'#0b1220',borderRadius:8,boxShadow:'0 8px 30px rgba(2,6,23,0.6)'}}>
      <h1 style={{fontSize:22,marginBottom:8}}>Checker</h1>
      <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center'}}>
        <input placeholder="Base server URL (مثال: http://localhost:3333)" value={base} onChange={e=>setBase(e.target.value)} style={{flex:1,padding:8,borderRadius:6,border:'1px solid rgba(255,255,255,0.06)',background:'#071426',color:'#e6eef8'}} />
        <button onClick={testSavetube} style={{padding:'8px 12px',borderRadius:6,background:'#0ea5a0',border:'none',cursor:'pointer'}}>Test savetube</button>
      </div>

      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left',color:'#9fb0c7'}}>
            <th style={{padding:'10px 8px'}}>No.</th>
            <th style={{padding:'10px 8px'}}>Feature Name</th>
            <th style={{padding:'10px 8px'}}>Request Method</th>
            <th style={{padding:'10px 8px'}}>Description</th>
            <th style={{padding:'10px 8px'}}>Query Parameter</th>
            <th style={{padding:'10px 8px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {apis.map(a => (
            <tr key={a.no} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}}>
              <td style={{padding:'12px 8px'}}>{a.no}</td>
              <td style={{padding:'12px 8px'}}>{a.name}</td>
              <td style={{padding:'12px 8px'}}><span style={{background:'#113344',padding:'6px 10px',borderRadius:999}}>{a.method}</span></td>
              <td style={{padding:'12px 8px'}}>{a.desc}</td>
              <td style={{padding:'12px 8px'}}>{a.params}</td>
              <td style={{padding:'12px 8px'}}><button onClick={testSavetube} style={{padding:'6px 10px',borderRadius:6,border:'none',cursor:'pointer'}}>Test</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:18}}>
        <p style={{color:'#9fb0c7'}}>مثال استدعاء API (GET):</p>
        <code style={{display:'block',background:'#071426',padding:12,borderRadius:6,color:'#a6d0f0'}}>
          https://YOUR_DOMAIN/api/savetube?url=https://youtu.be/VIDEO_ID&format=720
        </code>
      </div>

      <div style={{marginTop:18,background:'#071426',padding:12,borderRadius:6}}>
        <h3>نتيجة الاختبار</h3>
        {loading && <p>جارٍ الطلب...</p>}
        {!loading && result && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result,null,2)}</pre>}
        {!loading && !result && <p>لا توجد نتيجة بعد.</p>}
      </div>

    </div>
  )
}
