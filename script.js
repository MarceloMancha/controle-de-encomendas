const CONFIG = {
    NOME_SISTEMA: "Controle de Encomendas - Gate", 
    ID_CLIENTE: "banco_dados_gate_v1",             
};

let encomendas = JSON.parse(localStorage.getItem(CONFIG.ID_CLIENTE)) || [];
let selecionadaId = null;
let canvas, ctx, desenhando = false;
let html5QrCode;

// Sua agenda de moradores aqui (Mantida conforme original)
const agendaMoradores = {
    "Gate002": "11994392466",
    "Gate004": "11958649090",
    "Gate007": "11958649090",
    "Gate101": "11979861261",
    "Gate102": "11915568088",
    "Gate103": "11915568088",
    "Gate104": "11971556999",
    "Gate105": "11971556999",
    "Gate106": "11988132624",
    "Gate107": "11969715269",
    "Gate121": "11969715269",
    "Gate123": "11993498721",
    "Gate124": "11914217088",
    "Gate125": "11914217088",
    "Gate126": "11940057497",
    "Gate202": "11955303530",
    "Gate204": "11985918864",
    "Gate209": "11953472717",
    "Gate210": "11988067671",
    "Gate211": "11988067671",
    "Gate215": "11972277072",
    "Gate216": "11972277072",
    "Gate218": "11949380908",   
    "Gate219": "11981069977",
    "Gate220": "11988051513",
    "Gate223": "11949380908",
    "Gate224": "11981870451",
    "Gate225": "11981870451",
    "Gate226": "11981840136",
    "Gate302": "11942103456",
    "Gate304": "11910101213",
    "Gate305": "11993613117",
    "Gate307": "11993371621",
    "Gate308": "11993371621",
    "Gate310": "11987413211",
    "Gate311": "11987413211",
    "Gate315": "11977452000",
    "Gate319": "11912795347",
    "Gate323": "11912795347",
    "Gate324": "11954488602",
    "Gate325": "11954488602",
    "Gate326": "11986727868",
    "Gate401": "11994500123",
    "Gate402": "11984141218",
    "Gate405": "11947342215",
    "Gate406": "11913374949", 
    "Gate407": "11916991214",
    "Gate412": "11916270842",
    "Gate413": "11946093516",
    "Gate414": "11998636282",
    "Gate417": "11964420087",
    "Gate418": "11976711191",
    "Gate419": "11976711191",
    "Gate421": "11947342215",
    "Gate422": "11940728668",
    "Gate423": "11968799892",
    "Gate424": "11999743530",
    "Gate426": "11963232040",
    "Gate502": "11984887067",
    "Gate503": "11998592019",
    "Gate506": "11956800426",
    "Gate507": "11983156104",
    "Gate508": "11983156104",
    "Gate510": "11947342215",
    "Gate511": "11947342215",
    "Gate512": "11947342215",
    "Gate513": "11948286001",
    "Gate514": "11994781574",
    "Gate517": "11995971657",
    "Gate518": "11973637104",
    "Gate519": "11997163229",
    "Gate521": "11997863040",
    "Gate522": "11997863040",
    "Gate525": "11997163229",
    "Gate526": "11999002106",
    "Gate601": "11998384626",
    "Gate602": "11914849424",
    "Gate603": "11989478750",
    "Gate604": "11940502054",
    "Gate605": "11940394433",
    "Gate606": "11984323889",
    "Gate608": "11989698757",
    "Gate610": "11981559223",
    "Gate611": "11983104658",
    "Gate612": "11983104658",
    "Gate615": "11999555858",
    "Gate617": "11991154362",
    "Gate618": "11991154362",
    "Gate619": "11987013176",
    "Gate620": "11987013176",
    "Gate621": "11987013176",
    "Gate622": "11987013176",
    "Gate625": "11953125020",
    "Gate626": "11959561324",
    "Gate701": "11945983290",
    "Gate702": "11945983290",
    "Gate703": "11947342215",
    "Gate704": "11975277222",
    "Gate705": "11982694905",
    "Gate707": "11974442284",
    "Gate708": "11963097450",
    "Gate709": "11982008880",
    "Gate710": "11962021731",
    "Gate712": "11983539111",
    "Gate713": "11945551623",
    "Gate714": "11940091219",
    "Gate715": "11945778383",
    "Gate716": "11986321220",
    "Gate717": "11992136352",
    "Gate718": "11992136352",
    "Gate719": "11985355735",
    "Gate721": "11992445575",
    "Gate722": "11992136352",
    "Gate726": "11992136352",
    "Gate801": "11971773002",
    "Gate802": "11982084119",
    "Gate803": "11999378520",
    "Gate804": "11999378520",
    "Gate805": "11919998392",
    "Gate808": "11937079090",
    "Gate809": "11937079090",
    "Gate813": "11943023232",
    "Gate814": "11943023232",
    "Gate815": "11982490284",
    "Gate816": "11947425053",
    "Gate819": "11944509481",
    "Gate820": "11944509481",
    "Gate821": "11944509481",
    "Gate822": "11992414539",
    "Gate823": "11995529248",
    "Gate901": "11942253338",
    "Gate902": "11993062995",
    "Gate903": "11966232691",
    "Gate904": "11971917184",
    "Gate905": "11942090332",
    "Gate907": "11950400353",
    "Gate913": "11995348108",
    "Gate914": "11995348108",
    "Gate915": "11995348108",
    "Gate916": "11998592019",
    "Gate917": "11998592019",
    "Gate918": "11998592019",
    "Gate919": "11984261996",
    "Gate920": "11981638512",
    "Gate921": "11981638512",
    "Gate922": "11966177018",
    "Gate923": "11966177018",
    "Gate924": "11966346952",
    "Gate925": "11941903103",
    "Gate926": "11981081245",
    "Gate1001": "11984479820",
    "Gate1002": "11986970186",
    "Gate1003": "11912758090",
    "Gate1004": "11947089976",
    "Gate1005": "11999054195",
    "Gate1007": "11997056816",
    "Gate1008": "11982660283",
    "Gate1009": "11982660283",
    "Gate1010": "11998231391",
    "Gate1012": "11988406990",
    "Gate1014": "11994118788",
    "Gate1022": "11985863922",
    "Gate1023": "11985863922",
    "Gate1024": "11981957063",
    "Gate1025": "11970739076",
    "Gate1101": "11973781626",
    "Gate1102": "11948394992",
    "Gate1104": "11999258982",
    "Gate1105": "11992136352",
    "Gate1106": "11992136352",
    "Gate1107": "11943668324",
    "Gate1108": "11943668324",
    "Gate1110": "11971507476",
    "Gate1111": "11983199665",
    "Gate1112": "11940277289",    
    "Gate1113": "11943123167",
    "Gate1114": "1120609991",
    "Gate1115": "1120609991",
    "Gate1116": "1120609991",
    "Gate1117": "1120609991",
    "Gate1118": "1120609991",
    "Gate1119": "1120609991",
    "Gate1120": "1120609991",
    "Gate1121": "1120609991",
    "Gate1122": "11940611428",
    "Gate1123": "11940611428",
    "Gate1124": "11940611428",
    "Gate1125": "11940611428",
    "Gate1126": "11940611428",
    "Gate1203": "11993850978",
    "Gate1204": "11993850978",
    "Gate1205": "11996227252",
    "Gate1207": "11963570835",
    "Gate1208": "11963570835",
    "Gate1209": "1155558872",
    "Gate1210": "1155558872",
    "Gate1211": "1155558872",
    "Gate1212": "1155558872",
    "Gate1213": "1155558872",
    "Gate1214": "1155558872",
    "Gate1215": "1155558872",
    "Gate1216": "1155558872",
    "Gate1217": "11954585251",
    "Gate1222": "11981289538",
    "Gate1223": "11986967125",
    "Gate1224": "11986967125",
    "Gate1225": "11986967125",
    "Gate1226": "11912984074",
    "Gate1301": "11982887452",
    "Gate1302": "11982887452",
    "Gate1303": "11982887452",
    "Gate1304": "11982887452",
    "Gate1306": "11963490073",
    "Gate1307": "11960211124",
    "Gate1308": "11960211124",
    "Gate1309": "11951178978",
    "Gate1310": "11963587730",
    "Gate1311": "11963587730",
    "Gate1312": "11992906300",
    "Gate1313": "11992906300",
    "Gate1317": "11943482759",
    "Gate1318": "11943482759",
    "Gate1319": "11916270842",
    "Gate1320": "11976407877",
    "Gate1322": "11998938372",
    "Gate1323": "11998938372",
    "Gate1324": "11998938372",
    "Gate1325": "11943280317",
    "Gate1326": "11943280317",
    "Gate1403": "11916270842",
    "Gate1404": "11916270842",
    "Gate1407": "11942764856",
    "Gate1408": "11942764856",
    "Gate1409": "11942764856",
    "Gate1410": "11942764856"	,
    "Gate1411": "11942764856",
    "Gate1412": "11942764856",
    "Gate1415": "11983570675",
    "Gate1418": "11977109839",
    "Gate1419": "11977109839",
    "Gate1420": "11977109839",
    "Gate1422": "11917365825",
    "Gate1423": "11917365825",
    "Gate1424": "11982000174",
    "Gate1425": "11982000174",
    "Gate1501": "11962186775",
    "Gate1503": "11991487883",
    "Gate1504": "11991487883",
    "Gate1505": "11945205453",
    "Gate1506": "11945205453",
    "Gate1507": "11943482759",
    "Gate1508": "11943482759",
    "Gate1509": "11943482759",
    "Gate1510": "11943482759",
    "Gate1511": "11943482759",
    "Gate1512": "11943482759",
    "Gate1513": "11943482759",
    "Gate1514": "11943482759",
    "Gate1515": "1120609991",
    "Gate1516": "1120609991",
    "Gate1517": "1120609991",
    "Gate1518": "11953310000",
    "Gate1519": "11991542993",
    "Gate1520": "11992611390",
    "Gate1521": "11992611390",
    "Gate1522": "11943842468",
    "Gate1523": "11943842468",
    "Gate1524": "11941901504",
    "Gate1525": "11941901504",
    "Way001": "11994766923",
    "Way101": "3598154110",
    "Way102": "11966584923",
    "Way105": "3598154110",
    "Way106": "3598154110",
    "Way107": "11964038896",
    "Way201": "11977268575",
    "Way202": "11984608870",
    "Way204": "11988978251",
    "Way205": "11993020196",
    "Way209": "11982881864",
    "Way210": "11974762455",
    "Way303": "11951758930",
    "Way304": "11951758930",
    "Way306": "11991122765",
    "Way310": "11989558176",
    "Way404": "11981144343",
    "Way406": "11995088059",
    "Way407": "11983317178",
    "Way409": "11916657894",
    "Way410": "11916657894",
    "Way501": "11952369167",
    "Way502": "11947779894",
    "Way503": "11992544441",
    "Way504": "11949640168",
    "Way505": "11969219628",
    "Way507": "11991991833",
    "Way508": "11976704835",
    "Way601": "11991317150",
    "Way604": "11952063684",
    "Way610": "11975776105",
    "Way701": "11952250080",
    "Way702": "11945079814",
    "Way707": "11945079814",
    "Way710": "11938006905",
    "Way801": "11940183228",
    "Way802": "11958313345",
    "Way804": "11958313345",
    "Way808": "11958313345",
    "Way810": "11958313345",
    "Way901": "11977119335",
    "Way902": "11950666086",
    "Way903": "11950666086",
    "Way904": "11969219628",
    "Way905": "11941384840",
    "Way906": "11996019671",
    "Way907": "11996019671",
    "Way908": "11985006930",    
    "Way1001": "11993905617",
    "Way1005": "1135938483",
    "Way1006": "1135938483",
    "Way1010": "11940037132",
    "Way1101": "11958113536",
    "Way1104": "11997073515",
    "Way1105": "11997073515",
    "Way1106": "11997073515",
    "Way1107": "11997073515",
    "Way1110": "11958113536",
    "Way1201": "11979569039",
    "Way1202": "11993936531",
    "Way1205": "11983077846",
    "Way1206": "11988971195",
    "Way1208": "11933931917",
    "Way1302": "11989555962",
    "Way1303": "11975153885",
    "Way1306": "1142294029",
    "Way1307": "11937469366",
    "Way1310": "11953632530",
    "Way1401": "11942999009",
    "Way1403": "11941928289",
    "Way1404": "11994783019",
    "Way1405": "11963315000",
    "Way1406": "11989690868",
    "Way1409": "11989690868",
    "Way1501": "11941283021",
    "Way1502": "11950437885",
    "Way1503": "11973905126",
    "Way1504": "11973905126",
    "Way1505": "11912838165",
    "Way1507": "11947502427",
};

window.onload = () => {
    document.title = CONFIG.NOME_SISTEMA;
    renderizarTabela();
    atualizarDashboard();
    document.getElementById('sala').addEventListener('input', buscarContatoAutomatico);
    document.getElementById('torre').addEventListener('change', buscarContatoAutomatico);
};

function salvarEAtualizar() {
    localStorage.setItem(CONFIG.ID_CLIENTE, JSON.stringify(encomendas));
    renderizarTabela();
    atualizarDashboard();
}

function buscarContatoAutomatico() {
    const torre = document.getElementById('torre').value;
    const sala = document.getElementById('sala').value;
    const campoTelefone = document.getElementById('telefone');
    const chave = torre + sala;
    campoTelefone.value = agendaMoradores[chave] || "";
    campoTelefone.style.backgroundColor = agendaMoradores[chave] ? "#ecfdf5" : "";
}

function atualizarDashboard() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById('dashTotal').innerText = encomendas.filter(e => e.data === hoje).length;
    document.getElementById('dashAguardando').innerText = encomendas.filter(e => e.status === 'Aguardando retirada').length;
    document.getElementById('dashRetirados').innerText = encomendas.filter(e => e.status === 'Retirado').length;
}

function enviarZap(item, tipo) {
    if (!item.telefone) return;
    const agora = new Date();
    const min = (agora.getHours() * 60) + agora.getMinutes();
    let saudacao = (min < 720) ? "Bom dia" : (min <= 1110) ? "Boa tarde" : "Boa noite";
    
    let msg = (tipo === 'chegada') 
        ? `${saudacao}, *${item.destinatario}*! 📦\nSua encomenda (NF: *${item.nf}*) chegou no -1 setor de Encomendas.\n*Sala ${item.sala}* (${item.torre}).`
        : `✅ *Retirada Confirmada*\n${saudacao}, *${item.destinatario}*!\nSua encomenda (NF: *${item.nf}*) foi retirada por *${item.quemRetirou}* em ${item.dataRetirada}.`;

    window.open(`https://api.whatsapp.com/send?phone=55${item.telefone.replace(/\D/g, '')}&text=${encodeURIComponent(msg)}`, '_blank');
}

// SALVAR ENCOMENDA
document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const idExistente = document.getElementById('editId').value;
    const dados = {
        nf: document.getElementById('notaFiscal').value,
        torre: document.getElementById('torre').value,
        sala: document.getElementById('sala').value,
        destinatario: document.getElementById('destinatario').value,
        telefone: document.getElementById('telefone').value,
    };

    if (idExistente) {
        const index = encomendas.findIndex(enc => enc.id == idExistente);
        encomendas[index] = { ...encomendas[index], ...dados };
        cancelarEdicao();
    } else {
        const nova = { id: Date.now(), ...dados, data: new Date().toLocaleDateString('pt-BR'), status: 'Aguardando retirada', quemRetirou: '', dataRetirada: '', assinatura: '' };
        encomendas.push(nova);
        enviarZap(nova, 'chegada');
    }
    salvarEAtualizar();
    this.reset();
    document.getElementById('telefone').style.backgroundColor = "";
});

function aplicarFiltros() {
    const fData = document.getElementById('filtroData').value; 
    const fSala = document.getElementById('filtroSala').value.toLowerCase();
    const fNome = document.getElementById('filtroNome').value.toLowerCase();
    const fNF = document.getElementById('filtroNF').value.toLowerCase();
    const fStatus = document.getElementById('filtroStatus').value;

    const filtrados = encomendas.filter(e => {
        const dt = e.data.split('/').reverse().join('-');
        const bateData = fData === "" || dt === fData;
        const bateSala = fSala === "" || e.sala.toLowerCase().includes(fSala);
        const bateNome = fNome === "" || e.destinatario.toLowerCase().includes(fNome);
        const bateNF = fNF === "" || e.nf.toLowerCase().includes(fNF);
        const bateStatus = fStatus === "" || e.status === fStatus;

        return bateData && bateSala && bateNome && bateNF && bateStatus;
    });

    renderizarTabela(filtrados);

    const detalhesDiv = document.getElementById('resultadoConteudo');
    
    if(fSala || fNome || fNF || fData || fStatus) {
        if(filtrados.length > 0) {
            let html = `<div class="grid-previa">`;
            // REMOVIDO O .slice(0, 6) PARA MOSTRAR TODOS
            filtrados.forEach(item => {
                const corStatus = item.status === 'Retirado' ? '#e2e8f0' : '#d1fae5';
                html += `
                    <div class="mini-card" onclick="selecionarUnica(${item.id})" style="background: ${corStatus}">
                        <strong>Sala ${item.sala}</strong>
                        <span>${item.destinatario.split(' ')[0]}</span>
                        <small>${item.status === 'Retirado' ? '✅' : '📦'}</small>
                    </div>
                `;
            });
            html += `</div>`;
            detalhesDiv.innerHTML = html;
        } else {
            detalhesDiv.innerHTML = `<p style="color:red">Nenhuma encomenda encontrada.</p>`;
        }
        document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    }
}

function renderizarTabela(dados = encomendas) {
    const corpo = document.getElementById('listaCorpo');
    corpo.innerHTML = '';

    // --- TRECHO DA NOVA ORDENAÇÃO ---
    const ordenados = [...dados].sort((a, b) => {
        // 1. Ordena por Data (mais recente primeiro)
        const dataA = a.data.split('/').reverse().join('');
        const dataB = b.data.split('/').reverse().join('');
        if (dataA !== dataB) return dataB.localeCompare(dataA);

        // 2. Ordena por Torre (Gate primeiro, Way depois)
        if (a.torre !== b.torre) return a.torre.localeCompare(b.torre);

        // 3. Ordena por Sala (Crescente)
        // Usamos o replace(/\D/g, '') para garantir que trate como número se houver letras
        return parseInt(a.sala.replace(/\D/g, '')) - parseInt(b.sala.replace(/\D/g, ''));
    });
    // --------------------------------

    ordenados.forEach(item => {
        // ... resto do código (o tr.onclick e o innerHTML continuam iguais)
        const tr = document.createElement('tr');
        tr.onclick = () => selecionarUnica(item.id);
        tr.innerHTML = `
            <td>${item.data}</td><td>${item.nf}</td>
            <td style="font-weight:bold; color:#059669;">${item.sala}</td>
            <td>${item.torre}</td><td>${item.destinatario}</td>
            <td style="font-weight:bold; color:${item.status === 'Retirado' ? '#059669' : '#d97706'}">${item.status}</td>
            <td>
                <button onclick="event.stopPropagation(); editar(${item.id})">✏️</button>
                <button onclick="event.stopPropagation(); apagar(${item.id})">🗑️</button>
            </td>
        `;
        corpo.appendChild(tr);
    });
}

function selecionarUnica(id) {
    selecionadaId = id;
    const item = encomendas.find(e => e.id === id);
    
    // Foca na seção de detalhes
    document.getElementById('secao-detalhes').scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.getElementById('resultadoConteudo').innerHTML = `
        <div style="border-left:5px solid #059669; background:#fff; padding:15px; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #d1fae5;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                   <p style="margin:2px 0;"><strong>📦 NF:</strong> ${item.nf} | <strong>Sala:</strong> ${item.sala} (${item.torre})</p>
                   <p style="margin:2px 0;"><strong>👤 Nome:</strong> ${item.destinatario}</p>
                   <p style="margin:2px 0;"><strong>🚩 Status:</strong> ${item.status}</p>
                </div>
                <button onclick="visualizarTudo()" style="background:#f3f4f6; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">X</button>
            </div>
            ${item.status === 'Retirado' ? `
                <div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                    <p style="color:#059669; font-weight:bold;">✅ Retirado por: ${item.quemRetirou} em ${item.dataRetirada}</p>
                    <img src="${item.assinatura}" style="width:100%; max-width:300px; border:1px solid #ddd; background:#fff;" />
                </div>
            ` : `<button onclick="enviarZapManual(${item.id})" style="background:#22c55e; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer; margin-top:10px; font-weight:bold;">Reenviar WhatsApp</button>`}
        </div>
    `;

    const blocoR = document.getElementById('blocoConfirmarRetirada');
    if (item.status === 'Aguardando retirada') {
        blocoR.style.display = 'block';
        setTimeout(configurarCanvas, 100);
    } else {
        blocoR.style.display = 'none';
    }
}

// LÓGICA DE ASSINATURA E OUTROS (MANTIDA IGUAL)
function configurarCanvas() {
    canvas = document.getElementById('canvasAssinatura');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#064e3b";
    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const cx = (e.clientX || (e.touches && e.touches[0].clientX));
        const cy = (e.clientY || (e.touches && e.touches[0].clientY));
        return { x: (cx - rect.left) * (canvas.width / rect.width), y: (cy - rect.top) * (canvas.height / rect.height) };
    };
    canvas.onmousedown = (e) => { desenhando = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
    canvas.onmousemove = (e) => { if(desenhando) { const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); } };
    window.onmouseup = () => { desenhando = false; };
    canvas.ontouchstart = (e) => { desenhando = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); e.preventDefault(); };
    canvas.ontouchmove = (e) => { if(desenhando) { const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); } e.preventDefault(); };
    canvas.ontouchend = () => { desenhando = false; };
}

function finalizarEntrega() {
    const nome = document.getElementById('nomeRec').value;
    if(!nome) return alert("Informe quem está retirando.");
    const index = encomendas.findIndex(e => e.id === selecionadaId);
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.fillStyle = "#fff"; tCtx.fillRect(0,0,canvas.width,canvas.height);
    tCtx.drawImage(canvas, 0, 0);

    encomendas[index].status = 'Retirado';
    encomendas[index].quemRetirou = nome;
    encomendas[index].dataRetirada = new Date().toLocaleString('pt-BR');
    encomendas[index].assinatura = tempCanvas.toDataURL('image/jpeg', 0.5);

    salvarEAtualizar();
    enviarZap(encomendas[index], 'retirada');
    document.getElementById('nomeRec').value = "";
    document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    selecionarUnica(selecionadaId);
}

function limparAssinatura() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
function visualizarTudo() { 
    ['filtroData', 'filtroSala', 'filtroNome', 'filtroNF', 'filtroStatus'].forEach(id => document.getElementById(id).value = ""); 
    document.getElementById('resultadoConteudo').innerHTML = `<p>Use os filtros acima para buscar ou selecione na lista.</p>`;
    document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    renderizarTabela(); 
}
function apagar(id) { if(confirm("Excluir?")) { encomendas = encomendas.filter(e => e.id !== id); salvarEAtualizar(); } }

function editar(id) {
    const item = encomendas.find(e => e.id === id);
    document.getElementById('editId').value = item.id;
    document.getElementById('notaFiscal').value = item.nf;
    document.getElementById('torre').value = item.torre;
    document.getElementById('sala').value = item.sala;
    document.getElementById('destinatario').value = item.destinatario;
    document.getElementById('telefone').value = item.telefone;
    document.getElementById('tituloForm').innerText = "✏️ Editar Encomenda";
    document.getElementById('btnSalvar').innerText = "Atualizar";
    document.getElementById('btnCancelarEdit').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicao() {
    document.getElementById('formRecebimento').reset();
    document.getElementById('editId').value = "";
    document.getElementById('tituloForm').innerText = "📦 Novo Recebimento";
    document.getElementById('btnSalvar').innerText = "Salvar e Avisar Morador";
    document.getElementById('btnCancelarEdit').style.display = "none";
}

function exportarCSV() {
    let csv = "\ufeffData;NF;Torre;Sala;Destinatario;Status;Quem Retirou\n";
    encomendas.forEach(e => csv += `${e.data};${e.nf};${e.torre};${e.sala};${e.destinatario};${e.status};${e.quemRetirou}\n`);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Relatorio.csv`;
    link.click();
}

window.onscroll = () => { document.getElementById("btnTopo").style.display = (window.scrollY > 300) ? "block" : "none"; };
function voltarAoTopo() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function iniciarLeitor() {
    document.getElementById('area-scanner').style.display = 'block';
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
        document.getElementById('notaFiscal').value = text;
        pararLeitor();
    }).catch(err => alert("Erro na câmera"));
}
function pararLeitor() { if(html5QrCode) html5QrCode.stop().then(() => document.getElementById('area-scanner').style.display = 'none'); }
function enviarZapManual(id) { enviarZap(encomendas.find(e => e.id === id), 'chegada'); }
