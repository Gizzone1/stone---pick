import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";


// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  it: {
    appSub:"Favorita SpA", appDesc:"Condividi le proposte con il team e raccogli i pareri prima di investire.",
    navHome:"Home", navVote:"Valuta", navRegister:"Registrati", navAdmin:"Admin",
    btnVote:"Valuta un materiale", btnNewProposal:"Nuova proposta",
    activeProposals:"Proposte attive", teamLeader:"Team Leader",
    restricted:"Accesso riservato", pinPh:"PIN", access:"Accedi", pinWrong:"PIN errato",
    tabNew:"Nuova proposta", tabArchive:"Archivio", tabResults:"Risultati", tabSellers:"Venditori",
    active:"attive", archived:"archiviate", newProposalTitle:"Nuova proposta",
    matName:"Nome Materiale", matNamePh:"es. Patagonia Blue Quartzite",
    stoneType:"Tipo Pietra", format:"Formato", slabs:"Lastre", blocks:"Blocchi",
    buyPrice:"Prezzo acquisto", buyPricePh:"es. €180/mq — opzionale",
    salePrice:"Prezzo di vendita", salePricePh:"es. €380/mq — opzionale",
    sizes:"Misure / Spessori", sizesPh:"es. 320×180 cm — opzionale",
    notes:"Note per i venditori", notesPh:"Provenienza, fornitore, scadenza offerta…",
    videoLink:"Link Video (opzionale)", videoPh:"es. https://drive.google.com/…",
    sendTo:"Invia a", allSellers:"👥  Tutti i venditori", onlyTL:"⭐  Solo Team Leader",
    photos:"Fotografie", addPhotos:"Aggiungi fotografie", addMore:"+ Aggiungi altre",
    publish:"Pubblica proposta", noProposals:"Nessuna proposta creata.",
    buyLabel:"Acquisto:", saleLabel:"Vendita:", sizesLabel:"Misure:",
    votes:"voti", archiveBtn:"Archivia", deleteBtn:"Elimina",
    statusActive:"Attiva", statusArchived:"Archiviata",
    decisionTitle:"La tua decisione", buyDecision:"✅ Acquistiamo", passDecision:"❌ Non acquistiamo",
    adminCommentPh:"Aggiungi un commento personale al Buyer (opzionale)…",
    sendToBuyer:"Invia al Buyer", buyerPhoneLabel:"📱 N. Buyer WhatsApp", buyerPhonePh:"es. 393331234567 (senza +)",
    pending:"In attesa", favorable:"favorevoli", against:"contrari", pctFav:"% favorevoli",
    sellersTitle:"Gestione Venditori", regCodeTitle:"Codice di registrazione",
    generate:"Genera", sendInvite:"Invia invito via WhatsApp",
    regCodeNote:"Condividi questo codice con i venditori insieme al link dell'app.",
    addSellerPh:"Nome e cognome nuovo venditore",
    add:"Aggiungi", addedOk:"Venditore aggiunto.", addedErr:"Venditore già presente.",
    removeTL:"Rimuovi TL", makeTL:"Team Leader", removeOk:"Venditore rimosso.",
    chooseVote:"Scegli un materiale", noActive:"Nessuna proposta attiva.",
    votedYes:"✓ Hai votato sì", votedNo:"✗ Hai votato no",
    backToList:"← Torna alla lista", yourOpinion:"Il tuo parere",
    whoAreYou:"Chi sei?", selectName:"— Seleziona il tuo nome —",
    alreadyVoted:"Hai già espresso un parere. Puoi aggiornarlo.",
    voteLabel:"Voto *", yesVote:"✓  Sì, lo acquistiamo", noVote:"✗  No, non mi convince",
    commentLabel:"Commento", commentPh:"Motivazione, clienti interessati, feedback di mercato…",
    sendVote:"Invia il mio parere", watchVideo:"▶ Guarda il video",
    regTitle:"Registrati", regSub:"Primo accesso",
    nameLabel:"Nome e Cognome *", namePh:"es. Mario Rossi",
    codeLabel:"Codice di accesso *", codePh:"Inserisci il codice ricevuto",
    teamLabel:"Team *", registerBtn:"Registrati",
    phoneLabel:"Numero WhatsApp", phonePh:"es. 393331234567 (senza +)", phoneNote:"Opzionale — per ricevere notifiche sulle nuove proposte.",
    activeSession:"Accesso attivo", changeUser:"Cambia utente",
    regOk:"Registrazione completata!", nameErr:"Inserisci il tuo nome", codeErr:"Codice non valido",
    teamErr:"Seleziona almeno un team", nameExists:"Nome già registrato",
    voteRegistered:"Parere registrato.", proposalPublished:"Proposta pubblicata.",
    proposalDeleted:"Proposta eliminata.", proposalArchived:"Proposta archiviata.",
    newCode:"Nuovo codice generato: ", matRequired:"Inserisci il nome del materiale",
    sellerErr:"Seleziona il tuo nome", voteErr:"Esprimi il tuo voto",
    langLabel:"Lingua", closeBtn:"Chiudi",
    inviteMsg:(code,url)=>`Ciao! 👋\n\nTi invito a valutare i nuovi materiali su Favorita Stone Pick.\n\n📲 Apri l'app: ${url}\n🔑 Codice di accesso: *${code}*\n\nAl primo accesso tocca *Registrati*, inserisci il tuo nome e il codice.`,
    notifyBtn:"📣 Notifica venditori", notifySellersTitle:"Notifica tutti i venditori",
    notifyMsg:(name,type,fmt,price,url)=>[`🆕 *Nuova proposta su Stone Pick*`,``,`*${name}* — ${type} · ${fmt}`,price?`💰 Acquisto: ${price}`:"",``,`Apri l'app e esprimi il tuo parere 👉 ${url}`].filter(x=>x!=="???").join("\n"),
  },
  en: {
    appSub:"Favorita SpA", appDesc:"Share proposals with your team and collect opinions before investing.",
    navHome:"Home", navVote:"Evaluate", navRegister:"Sign Up", navAdmin:"Admin",
    btnVote:"Evaluate a material", btnNewProposal:"New proposal",
    activeProposals:"Active proposals", teamLeader:"Team Leader",
    restricted:"Restricted access", pinPh:"PIN", access:"Login", pinWrong:"Wrong PIN",
    tabNew:"New proposal", tabArchive:"Archive", tabResults:"Results", tabSellers:"Sellers",
    active:"active", archived:"archived", newProposalTitle:"New proposal",
    matName:"Material Name", matNamePh:"e.g. Patagonia Blue Quartzite",
    stoneType:"Stone Type", format:"Format", slabs:"Slabs", blocks:"Blocks",
    buyPrice:"Purchase price", buyPricePh:"e.g. €180/sqm — optional",
    salePrice:"Sale price", salePricePh:"e.g. €380/sqm — optional",
    sizes:"Sizes / Thickness", sizesPh:"e.g. 320×180 cm — optional",
    notes:"Notes for sellers", notesPh:"Origin, supplier, offer expiry…",
    videoLink:"Video Link (optional)", videoPh:"e.g. https://drive.google.com/…",
    sendTo:"Send to", allSellers:"👥  All sellers", onlyTL:"⭐  Team Leaders only",
    photos:"Photos", addPhotos:"Add photos", addMore:"+ Add more",
    publish:"Publish proposal", noProposals:"No proposals created yet.",
    buyLabel:"Purchase:", saleLabel:"Sale:", sizesLabel:"Sizes:",
    votes:"votes", archiveBtn:"Archive", deleteBtn:"Delete",
    statusActive:"Active", statusArchived:"Archived",
    decisionTitle:"Your decision", buyDecision:"✅ We buy it", passDecision:"❌ We pass",
    adminCommentPh:"Add a personal comment to the Buyer (optional)…",
    sendToBuyer:"Send to Buyer", buyerPhoneLabel:"📱 Buyer WhatsApp No.", buyerPhonePh:"e.g. 393331234567 (no +)",
    pending:"Pending", favorable:"in favour", against:"against", pctFav:"% in favour",
    sellersTitle:"Manage Sellers", regCodeTitle:"Registration code",
    generate:"Generate", sendInvite:"Send invite via WhatsApp",
    regCodeNote:"Share this code with sellers along with the app link.",
    addSellerPh:"New seller full name",
    add:"Add", addedOk:"Seller added.", addedErr:"Seller already exists.",
    removeTL:"Remove TL", makeTL:"Team Leader", removeOk:"Seller removed.",
    chooseVote:"Choose a material", noActive:"No active proposals.",
    votedYes:"✓ You voted yes", votedNo:"✗ You voted no",
    backToList:"← Back to list", yourOpinion:"Your opinion",
    whoAreYou:"Who are you?", selectName:"— Select your name —",
    alreadyVoted:"You already voted. You can update your vote.",
    voteLabel:"Vote *", yesVote:"✓  Yes, let's buy it", noVote:"✗  No, I'm not convinced",
    commentLabel:"Comment", commentPh:"Reason, interested clients, market feedback…",
    sendVote:"Submit my opinion", watchVideo:"▶ Watch video",
    regTitle:"Sign Up", regSub:"First access",
    nameLabel:"Full Name *", namePh:"e.g. John Smith",
    codeLabel:"Access code *", codePh:"Enter the code you received",
    teamLabel:"Team *", registerBtn:"Sign Up",
    phoneLabel:"WhatsApp Number", phonePh:"e.g. 393331234567 (no +)", phoneNote:"Optional — to receive notifications about new proposals.",
    activeSession:"Active session", changeUser:"Change user",
    regOk:"Registration complete!", nameErr:"Enter your name", codeErr:"Invalid code",
    teamErr:"Select at least one team", nameExists:"Name already registered",
    voteRegistered:"Opinion submitted.", proposalPublished:"Proposal published.",
    proposalDeleted:"Proposal deleted.", proposalArchived:"Proposal archived.",
    newCode:"New code generated: ", matRequired:"Enter the material name",
    sellerErr:"Select your name", voteErr:"Cast your vote",
    langLabel:"Language", closeBtn:"Close",
    inviteMsg:(code,url)=>`Hi! 👋\n\nYou're invited to evaluate new materials on Favorita Stone Pick.\n\n📲 Open the app: ${url}\n🔑 Access code: *${code}*\n\nOn first access tap *Sign Up*, enter your name and the code.`,
    notifyBtn:"📣 Notify sellers", notifySellersTitle:"Notify all sellers",
    notifyMsg:(name,type,fmt,price,url)=>[`🆕 *New proposal on Stone Pick*`,``,`*${name}* — ${type} · ${fmt}`,price?`💰 Purchase: ${price}`:"",``,`Open the app and share your opinion 👉 ${url}`].filter(x=>x!=="???").join("\n"),
  },
  pt: {
    appSub:"Favorita SpA", appDesc:"Compartilhe propostas com a equipe e colete opiniões antes de investir.",
    navHome:"Início", navVote:"Avaliar", navRegister:"Registrar", navAdmin:"Admin",
    btnVote:"Avaliar um material", btnNewProposal:"Nova proposta",
    activeProposals:"Propostas ativas", teamLeader:"Team Leader",
    restricted:"Acesso restrito", pinPh:"PIN", access:"Entrar", pinWrong:"PIN incorreto",
    tabNew:"Nova proposta", tabArchive:"Arquivo", tabResults:"Resultados", tabSellers:"Vendedores",
    active:"ativas", archived:"arquivadas", newProposalTitle:"Nova proposta",
    matName:"Nome do Material", matNamePh:"ex. Patagonia Blue Quartzite",
    stoneType:"Tipo de Pedra", format:"Formato", slabs:"Chapas", blocks:"Blocos",
    buyPrice:"Preço de compra", buyPricePh:"ex. €180/m² — opcional",
    salePrice:"Preço de venda", salePricePh:"ex. €380/m² — opcional",
    sizes:"Medidas / Espessura", sizesPh:"ex. 320×180 cm — opcional",
    notes:"Notas para vendedores", notesPh:"Origem, fornecedor, validade da oferta…",
    videoLink:"Link de Vídeo (opcional)", videoPh:"ex. https://drive.google.com/…",
    sendTo:"Enviar para", allSellers:"👥  Todos os vendedores", onlyTL:"⭐  Somente Team Leaders",
    photos:"Fotos", addPhotos:"Adicionar fotos", addMore:"+ Adicionar mais",
    publish:"Publicar proposta", noProposals:"Nenhuma proposta criada.",
    buyLabel:"Compra:", saleLabel:"Venda:", sizesLabel:"Medidas:",
    votes:"votos", archiveBtn:"Arquivar", deleteBtn:"Excluir",
    statusActive:"Ativa", statusArchived:"Arquivada",
    decisionTitle:"Sua decisão", buyDecision:"✅ Vamos comprar", passDecision:"❌ Não vamos comprar",
    adminCommentPh:"Adicione um comentário pessoal ao Comprador (opcional)…",
    sendToBuyer:"Enviar ao Comprador", buyerPhoneLabel:"📱 WhatsApp do Comprador", buyerPhonePh:"ex. 393331234567 (sem +)",
    pending:"Aguardando", favorable:"favoráveis", against:"contrários", pctFav:"% favoráveis",
    sellersTitle:"Gestão de Vendedores", regCodeTitle:"Código de registro",
    generate:"Gerar", sendInvite:"Enviar convite via WhatsApp",
    regCodeNote:"Compartilhe este código com os vendedores junto com o link do app.",
    addSellerPh:"Nome completo do novo vendedor",
    add:"Adicionar", addedOk:"Vendedor adicionado.", addedErr:"Vendedor já existe.",
    removeTL:"Remover TL", makeTL:"Team Leader", removeOk:"Vendedor removido.",
    chooseVote:"Escolha um material", noActive:"Nenhuma proposta ativa.",
    votedYes:"✓ Você votou sim", votedNo:"✗ Você votou não",
    backToList:"← Voltar à lista", yourOpinion:"Sua opinião",
    whoAreYou:"Quem é você?", selectName:"— Selecione seu nome —",
    alreadyVoted:"Você já votou. Pode atualizar seu voto.",
    voteLabel:"Voto *", yesVote:"✓  Sim, vamos comprar", noVote:"✗  Não me convence",
    commentLabel:"Comentário", commentPh:"Motivo, clientes interessados, feedback de mercado…",
    sendVote:"Enviar minha opinião", watchVideo:"▶ Ver vídeo",
    regTitle:"Registrar", regSub:"Primeiro acesso",
    nameLabel:"Nome Completo *", namePh:"ex. João Silva",
    codeLabel:"Código de acesso *", codePh:"Digite o código recebido",
    teamLabel:"Equipe *", registerBtn:"Registrar",
    phoneLabel:"Número WhatsApp", phonePh:"ex. 393331234567 (sem +)", phoneNote:"Opcional — para receber notificações sobre novas propostas.",
    activeSession:"Sessão ativa", changeUser:"Trocar usuário",
    regOk:"Registro concluído!", nameErr:"Digite seu nome", codeErr:"Código inválido",
    teamErr:"Selecione pelo menos uma equipe", nameExists:"Nome já registrado",
    voteRegistered:"Opinião registrada.", proposalPublished:"Proposta publicada.",
    proposalDeleted:"Proposta excluída.", proposalArchived:"Proposta arquivada.",
    newCode:"Novo código gerado: ", matRequired:"Digite o nome do material",
    sellerErr:"Selecione seu nome", voteErr:"Vote agora",
    langLabel:"Idioma", closeBtn:"Fechar",
    inviteMsg:(code,url)=>`Olá! 👋\n\nVocê está convidado(a) a avaliar novos materiais no Favorita Stone Pick.\n\n📲 Abra o app: ${url}\n🔑 Código de acesso: *${code}*\n\nNo primeiro acesso toque em *Registrar*, insira seu nome e o código.`,
    notifyBtn:"📣 Notificar vendedores", notifySellersTitle:"Notificar todos os vendedores",
    notifyMsg:(name,type,fmt,price,url)=>[`🆕 *Nova proposta no Stone Pick*`,``,`*${name}* — ${type} · ${fmt}`,price?`💰 Compra: ${price}`:"",``,`Abra o app e compartilhe sua opinião 👉 ${url}`].filter(x=>x!=="???").join("\n"),
  }
};

const DEFAULT_SELLERS = [];
 

const STONE_TYPES=["Marmo","Granito","Quartzite","Travertino","Onice","Pietra calcarea","Basalto","Scisto","Altro","Non identificato / Da definire"];
const PIN="1234";
const TEAMS=["Cavaion","Lonigo","Brasile"];
const REG_CODE_KEY="fav_reg_code";



function resizeImage(dataUrl,maxW=1400,maxH=1400,quality=0.85){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>{let{width:w,height:h}=img;if(w>maxW||h>maxH){const r=Math.min(maxW/w,maxH/h);w=Math.round(w*r);h=Math.round(h*r);}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);resolve(c.toDataURL("image/jpeg",quality));};
    img.src=dataUrl;
  });
}

const WA_ICON=<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.032-1.371l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.53 6.53 2.106 12 2.106S21.894 6.53 21.894 12 17.47 21.894 12 21.894z"/></svg>;

export default function App(){
  const [lang,setLang]=useState(()=>localStorage.getItem("fav_lang")||"it");
  const t=T[lang];
  const changeLang=(l)=>{setLang(l);localStorage.setItem("fav_lang",l);};

  const [view,setView]=useState("home");
  const [proposals,setProposals]=useState([]);
  const [votes,setVotes]=useState({});
  const [loading,setLoading]=useState(true);
  const [selectedProposal,setSelectedProposal]=useState(null);
  const [selectedSeller,setSelectedSeller]=useState(()=>localStorage.getItem("fav_seller")||"");
  const [adminForm,setAdminForm]=useState({name:"",type:"Marmo",format:"lastra",price:"",salePrice:"",size:"",notes:"",videoUrl:"",images:[],audience:"all"});
  const [lightbox,setLightbox]=useState(null);
  const [voteForm,setVoteForm]=useState({vote:null,comment:""});
  const [adminPin,setAdminPin]=useState("");
  const [pinOk,setPinOk]=useState(false);
  const [toast,setToast]=useState(null);
  const [activeTab,setActiveTab]=useState("new");
  const [sellers,setSellers]=useState(()=>{try{const s=localStorage.getItem("fav_sellers");return s?JSON.parse(s):DEFAULT_SELLERS;}catch{return DEFAULT_SELLERS;}});
  const [newSellerName,setNewSellerName]=useState("");
  const [regCode,setRegCode]=useState(()=>localStorage.getItem(REG_CODE_KEY)||"");useEffect(()=>{supabase.from("settings").select("*").then(({data})=>{const r=data?.find(x=>x.key==="reg_code");if(r)setRegCode(r.value);});},[]);
  
  const [regForm,setRegForm]=useState({name:"",code:"",teams:[],phone:""});
  const [regDone,setRegDone]=useState(false);
  const [decisions,setDecisions]=useState({});
  const [lastPublished,setLastPublished]=useState(null);
  const [adminComments,setAdminComments]=useState({});
  const [buyerPhone,setBuyerPhone]=useState(()=>localStorage.getItem("buyer_phone")||"393920807822");

  const saveSellers=(u)=>{setSellers(u);try{localStorage.setItem("fav_sellers",JSON.stringify(u));}catch{}};

  useEffect(()=>{loadAll();},[]);

  async function loadAll(){
    setLoading(true);
    try{
      const [{data:pData},{data:vData}]=await Promise.all([
        supabase.from("proposals").select("*").order("created_at",{ascending:false}),
        supabase.from("votes").select("*"),
      ]);
      setProposals(pData||[]);
      const vMap={};
      (vData||[]).forEach(v=>{
        if(!vMap[v.proposal_id]) vMap[v.proposal_id]={};
        vMap[v.proposal_id][v.seller_name]={vote:v.vote,comment:v.comment,at:v.voted_at};
      });
      setVotes(vMap);
    }catch(e){showToast("Errore di connessione","err");}
    setLoading(false);
  }

  useEffect(()=>{
    const ch=supabase.channel("rt")
      .on("postgres_changes",{event:"*",schema:"public",table:"proposals"},loadAll)
      .on("postgres_changes",{event:"*",schema:"public",table:"votes"},loadAll)
      .subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);
  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);};
  const go=(v,fn)=>{setView(v);fn?.();};

  const SELLERS=sellers.map(s=>s.name);
  const TEAM_LEADERS=sellers.filter(s=>s.isTeamLeader).map(s=>s.name);
  const getSellers=(p)=>p?.audience==="team_leaders"?TEAM_LEADERS:SELLERS;

  const getStats=(pid)=>{
    const pv=votes[pid]||{},entries=Object.values(pv);
    const yes=entries.filter(v=>v.vote==="yes").length,no=entries.filter(v=>v.vote==="no").length,total=entries.length;
    const proposal=proposals.find(p=>p.id===pid);
    return{yes,no,total,pct:total?Math.round((yes/total)*100):0,maxVotes:getSellers(proposal).length};
  };

  const handleRegister=async()=>{
    if(!regForm.name.trim()){showToast(t.nameErr,"err");return;}
    const{data:sd}=await supabase.from("settings").select("*").eq("key","reg_code").single();const validCode=sd?.value||regCode;if(!validCode||regForm.code.trim()!==validCode.trim()){showToast(t.codeErr,"err");return;}
    if(regForm.teams.length===0){showToast(t.teamErr,"err");return;}
    if(sellers.find(s=>s.name.toLowerCase()===regForm.name.trim().toLowerCase())){showToast(t.nameExists,"err");return;}
    saveSellers([...sellers,{name:regForm.name.trim(),isTeamLeader:false,teams:regForm.teams,phone:regForm.phone.replace(/[^0-9]/g,"")||null}]);
    localStorage.setItem("fav_seller",regForm.name.trim());
    setSelectedSeller(regForm.name.trim());
    setRegDone(true);showToast(t.regOk);
  };

  const handleImageUpload=(e)=>{
    Array.from(e.target.files).forEach(file=>{
      const reader=new FileReader();
      reader.onload=async(ev)=>{const r=await resizeImage(ev.target.result);setAdminForm(f=>({...f,images:[...f.images,r]}));};
      reader.readAsDataURL(file);
    });e.target.value="";
  };

  const handleCreateProposal=async()=>{
    if(!adminForm.name.trim()){showToast(t.matRequired,"err");return;}
    const payload={name:adminForm.name.trim(),type:adminForm.type,format:adminForm.format,price:adminForm.price||null,sale_price:adminForm.salePrice||null,size:adminForm.size||null,notes:adminForm.notes||null,video_url:adminForm.videoUrl||null,images:adminForm.images,audience:adminForm.audience,status:"active"};
    const{data,error}=await supabase.from("proposals").insert(payload).select().single();
    if(error){showToast("Errore: "+error.message,"err");return;}
    setLastPublished({...data,salePrice:data.sale_price,videoUrl:data.video_url});
    setAdminForm({name:"",type:"Marmo",format:"lastra",price:"",salePrice:"",size:"",notes:"",videoUrl:"",images:[],audience:"all"});
    showToast(t.proposalPublished);setActiveTab("list");
  };

  const handleDeleteProposal=async(id)=>{await supabase.from("votes").delete().eq("proposal_id",id);await supabase.from("proposals").delete().eq("id",id);showToast(t.proposalDeleted);};
  const handleArchiveProposal=async(id)=>{await supabase.from("proposals").update({status:"archived"}).eq("id",id);showToast(t.proposalArchived);};

  const handleVote=async()=>{
    if(!selectedSeller){showToast(t.sellerErr,"err");return;}
    if(voteForm.vote===null){showToast(t.voteErr,"err");return;}
    const{error}=await supabase.from("votes").upsert({
      proposal_id:selectedProposal.id,seller_name:selectedSeller,
      vote:voteForm.vote,comment:voteForm.comment||null,
      voted_at:new Date().toLocaleDateString("it-IT"),
    },{onConflict:"proposal_id,seller_name"});
    if(error){showToast("Errore: "+error.message,"err");return;}
    setVoteForm({vote:null,comment:""});showToast(t.voteRegistered);setView("home");
  };

  const sendToWhatsApp=(p,s,decision)=>{
    const pv=votes[p.id]||{};
    const comments=Object.entries(pv).filter(([,v])=>v.comment).map(([name,v])=>`  • ${name}: "${v.comment}"`).join("\n");
    const adminNote=adminComments[p.id]?.trim();
    const decLine=decision==="buy"?t.buyDecision.replace("✅ ","✅ Decisione: "):t.passDecision.replace("❌ ","❌ Decisione: ");
    const msg=[
      `*${p.name}* — ${p.type} · ${p.format}`,decLine,
      adminNote?`\n📝 ${t.notes.split(" ")[0]}: ${adminNote}`:"","",
      `📊 ${s.yes} ${t.favorable} · ${s.no} ${t.against} (${s.pct}${t.pctFav})`,
      p.price?`💰 ${t.buyLabel} ${p.price}`:"",p.salePrice?`💶 ${t.saleLabel} ${p.salePrice}`:"",
      p.size?`📐 ${t.sizesLabel} ${p.size}`:"",
      comments?`\n💬 ${t.commentLabel}:\n${comments}`:"",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${buyerPhone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const mapP=(p)=>({...p,salePrice:p.sale_price||p.salePrice,videoUrl:p.video_url||p.videoUrl});
  const activeProposals=proposals.map(mapP).filter(p=>{
    if(p.status!=="active") return false;
    if(p.audience==="team_leaders"&&selectedSeller&&!TEAM_LEADERS.includes(selectedSeller)) return false;
    return true;
  });
  const alreadyVoted=selectedProposal?!!(votes[selectedProposal.id]?.[selectedSeller]):false;
  const currentSeller=sellers.find(s=>s.name===selectedSeller);

  const LangSwitcher=({small})=>(
    <div style={{display:"flex",gap:small?4:8,justifyContent:small?"flex-start":"center"}}>
      {[["it","🇮🇹","Italiano"],["en","🇬🇧","English"],["pt","🇧🇷","Português"]].map(([l,flag,label])=>(
        <button key={l} onClick={()=>changeLang(l)} style={{padding:small?"2px 4px":"9px 14px",border:`1px solid ${lang===l?"#454545":"#e8e8e8"}`,background:lang===l?"#454545":"#fff",color:lang===l?"#fff":"#999",fontFamily:"'Lato',sans-serif",fontSize:small?10:11,cursor:"pointer",letterSpacing:small?1:0}}>
          {small?flag:`${flag} ${label}`}
        </button>
      ))}
    </div>
  );

  if(loading) return(
    <div style={{minHeight:"100vh",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:24}}>
      <img src="https://www.granitifavorita.com/images/logo-favorita.png" alt="Favorita" style={{height:32,opacity:0.4}} onError={e=>e.target.style.display="none"}/>
      <div style={{width:28,height:28,border:"1.5px solid #ddd",borderTopColor:"#454545",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
      <style>{"@keyframes spin{to{transform:rotate(360deg);}}"}</style>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#fff",fontFamily:"'Cormorant Garamond', Georgia, serif",color:"#454545"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:200,background:"#fff",borderBottom:"1px solid #e8e8e8"}}>
        <div style={{maxWidth:720,margin:"0 auto",padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
            <img src="https://www.granitifavorita.com/images/logo-favorita.png" alt="Favorita" style={{height:26}} onError={e=>e.target.style.display="none"}/>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <LangSwitcher small/>
            <nav style={{display:"flex",gap:16}}>
              {[["home",t.navHome],["vote",t.navVote],["register",t.navRegister],["admin",t.navAdmin]].map(([v,l])=>(
                <button key={v} onClick={()=>go(v,v==="vote"?()=>setSelectedProposal(null):undefined)}
                  style={{background:"none",border:"none",borderBottom:view===v?"1px solid #454545":"1px solid transparent",cursor:"pointer",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:view===v?"#2a2a2a":"#bbb",paddingBottom:2}}>
                  {l}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {toast&&<div style={{position:"fixed",top:66,left:"50%",transform:"translateX(-50%)",background:"#2a2a2a",color:"#fff",padding:"9px 24px",fontFamily:"'Lato',sans-serif",fontSize:12,letterSpacing:1.5,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.15)"}}>{toast.msg}</div>}

      <div style={{maxWidth:720,margin:"0 auto",padding:"20px 20px 80px"}}>

        {/* HOME */}
        {view==="home"&&<>
          <div style={{textAlign:"center",padding:"36px 0 32px"}}>
            <p style={ey}>{t.appSub}</p>
            <h1 style={{fontSize:28,fontWeight:300,fontStyle:"italic",margin:"10px 0 10px",color:"#2a2a2a",lineHeight:1.2}}>Stone Pick</h1>
            <p style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:"#999",lineHeight:1.8,maxWidth:380,margin:"0 auto 24px",fontWeight:300}}>{t.appDesc}</p>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <Btn onClick={()=>go("vote",()=>setSelectedProposal(null))}>{t.btnVote}</Btn>
              <Btn outline onClick={()=>go("admin",()=>{setPinOk(false);setActiveTab("new");})}>{t.btnNewProposal}</Btn>
            </div>
          </div>
          {activeProposals.length>0&&<>
            <p style={{...ey,marginBottom:14}}>{t.activeProposals} — {activeProposals.length}</p>
            {activeProposals.map(p=>{
              const s=getStats(p.id);
              return(
                <div key={p.id} onClick={()=>go("vote",()=>{setSelectedProposal(mapP(p));setVoteForm({vote:null,comment:""});})}
                  style={{background:"#fff",border:"1px solid #ebebeb",marginBottom:8,display:"flex",cursor:"pointer",overflow:"hidden",transition:"border-color 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#c8b89a"} onMouseLeave={e=>e.currentTarget.style.borderColor="#ebebeb"}>
                  {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:64,height:64,objectFit:"cover",flexShrink:0}}/>:<div style={{width:64,height:64,background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"#ddd",fontSize:20}}>◈</span></div>}
                  <div style={{flex:1,padding:"11px 14px"}}>
                    <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#bbb",margin:"0 0 3px"}}>{p.type} · {p.format}</p>
                    <p style={{fontSize:17,fontStyle:"italic",color:"#2a2a2a",margin:"0 0 4px"}}>{p.name}</p>
                    {p.audience==="team_leaders"&&<span style={{fontFamily:"'Lato',sans-serif",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"#fff",background:"#454545",padding:"2px 7px"}}>{t.teamLeader}</span>}
                  </div>
                  <div style={{padding:"11px 14px",textAlign:"right",flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",gap:2}}>
                    <p style={{fontFamily:"'Lato',sans-serif",fontSize:12,margin:0}}><span style={{color:"#2e7d4f",fontWeight:700}}>✓{s.yes}</span><span style={{color:"#9e2a2a",fontWeight:700,marginLeft:8}}>✗{s.no}</span></p>
                    <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,color:"#bbb",margin:0}}>{s.total}/{s.maxVotes}</p>
                  </div>
                </div>
              );
            })}
          </>}
        </>}

        {/* ADMIN */}
        {view==="admin"&&<div style={{paddingTop:28}}>
          {!pinOk?(
            <div style={{maxWidth:300,margin:"40px auto",textAlign:"center"}}>
              <p style={ey}>{t.restricted}</p>
              <h2 style={{fontSize:28,fontWeight:300,fontStyle:"italic",margin:"10px 0 24px",color:"#2a2a2a"}}>{t.navAdmin}</h2>
              <input type="password" placeholder={t.pinPh} value={adminPin} onChange={e=>setAdminPin(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"){if(adminPin===PIN)setPinOk(true);else showToast(t.pinWrong,"err");}}}
                style={{...inp,textAlign:"center",letterSpacing:8,fontSize:20}}/>
              <div style={{marginTop:14}}><Btn onClick={()=>{if(adminPin===PIN)setPinOk(true);else showToast(t.pinWrong,"err");}}>{t.access}</Btn></div>
            </div>
          ):<>
            <div style={{display:"flex",borderBottom:"1px solid #e8e8e8",marginBottom:28,overflowX:"auto"}}>
              {[["new",t.tabNew],["list",`${t.tabArchive} (${proposals.filter(p=>p.status==="active").length} ${t.active} · ${proposals.filter(p=>p.status==="archived").length} ${t.archived})`],["results",t.tabResults],["sellers",t.tabSellers]].map(([k,l])=>(
                <button key={k} onClick={()=>setActiveTab(k)} style={{padding:"10px 16px",background:"none",border:"none",borderBottom:activeTab===k?"2px solid #454545":"2px solid transparent",cursor:"pointer",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:activeTab===k?"#2a2a2a":"#bbb",marginBottom:-1,whiteSpace:"nowrap"}}>{l}</button>
              ))}
            </div>

            {activeTab==="new"&&<div>
              <h2 style={{fontSize:24,fontWeight:300,fontStyle:"italic",margin:"0 0 24px",color:"#2a2a2a"}}>{t.newProposalTitle}</h2>
              <Lbl>{t.matName} *</Lbl>
              <input style={inp} placeholder={t.matNamePh} value={adminForm.name} onChange={e=>setAdminForm(f=>({...f,name:e.target.value}))}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><Lbl>{t.stoneType}</Lbl><select style={inp} value={adminForm.type} onChange={e=>setAdminForm(f=>({...f,type:e.target.value}))}>{STONE_TYPES.map(s=><option key={s}>{s}</option>)}</select></div>
                <div><Lbl>{t.format}</Lbl><select style={inp} value={adminForm.format} onChange={e=>setAdminForm(f=>({...f,format:e.target.value}))}><option value="lastra">{t.slabs}</option><option value="blocco">{t.blocks}</option></select></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><Lbl>{t.buyPrice}</Lbl><input style={inp} placeholder={t.buyPricePh} value={adminForm.price} onChange={e=>setAdminForm(f=>({...f,price:e.target.value}))}/></div>
                <div><Lbl>{t.salePrice}</Lbl><input style={inp} placeholder={t.salePricePh} value={adminForm.salePrice} onChange={e=>setAdminForm(f=>({...f,salePrice:e.target.value}))}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><Lbl>{t.sizes}</Lbl><input style={inp} placeholder={t.sizesPh} value={adminForm.size} onChange={e=>setAdminForm(f=>({...f,size:e.target.value}))}/></div>
                <div/>
              </div>
              <Lbl>{t.notes}</Lbl>
              <textarea style={{...inp,height:80,resize:"vertical"}} placeholder={t.notesPh} value={adminForm.notes} onChange={e=>setAdminForm(f=>({...f,notes:e.target.value}))}/>
              <Lbl>{t.videoLink}</Lbl>
              <input style={inp} placeholder={t.videoPh} value={adminForm.videoUrl} onChange={e=>setAdminForm(f=>({...f,videoUrl:e.target.value}))}/>
              <Lbl>{t.sendTo}</Lbl>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[["all",t.allSellers],["team_leaders",t.onlyTL]].map(([val,label])=>(
                  <button key={val} type="button" onClick={()=>setAdminForm(f=>({...f,audience:val}))}
                    style={{padding:"13px 10px",border:`1px solid ${adminForm.audience===val?"#454545":"#e8e8e8"}`,background:adminForm.audience===val?"#454545":"#fff",color:adminForm.audience===val?"#fff":"#999",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}>
                    {label}
                  </button>
                ))}
              </div>
              <Lbl>{t.photos}</Lbl>
              {adminForm.images.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}}>
                {adminForm.images.map((url,idx)=>(
                  <div key={idx} style={{position:"relative",aspectRatio:"1",background:"#f5f5f5"}}>
                    <img src={url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <button onClick={()=>setAdminForm(f=>({...f,images:f.images.filter((_,i)=>i!==idx)}))} style={{position:"absolute",top:4,right:4,background:"rgba(255,255,255,0.9)",border:"none",width:20,height:20,fontSize:10,cursor:"pointer",color:"#454545"}}>✕</button>
                  </div>
                ))}
              </div>}
              <label style={{display:"block",border:"1px dashed #d8d8d8",padding:"18px",textAlign:"center",cursor:"pointer",background:"#fafafa"}}
                onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="#fafafa"}>
                <input type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleImageUpload}/>
                <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:2,color:"#bbb",textTransform:"uppercase"}}>{adminForm.images.length===0?t.addPhotos:t.addMore}</span>
              </label>
              <div style={{marginTop:24}}><Btn onClick={handleCreateProposal}>{t.publish}</Btn></div>
            </div>}

            {activeTab==="list"&&<div>
              {lastPublished&&<div style={{background:"#f4fbf7",border:"1px solid #c8e6d3",padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#2e7d4f",margin:"0 0 3px"}}>{t.proposalPublished}</p>
                  <p style={{fontSize:16,fontStyle:"italic",color:"#2a2a2a",margin:0}}>{lastPublished.name}</p>
                </div>
                <button onClick={()=>{
                  const url=window.location.href.split("?")[0];
                  const msg=t.notifyMsg(lastPublished.name,lastPublished.type,lastPublished.format,lastPublished.price,url);
                  const sellersWithPhone=sellers.filter(s=>s.phone);
                  if(sellersWithPhone.length===0){
                    window.open("https://wa.me/?text="+encodeURIComponent(msg),"_blank");
                  } else {
                    sellersWithPhone.forEach((s,i)=>{
                      setTimeout(()=>window.open(`https://wa.me/${s.phone}?text=${encodeURIComponent(msg)}`,"_blank"),i*600);
                    });
                  }
                }} style={{display:"flex",alignItems:"center",gap:7,padding:"10px 16px",background:"#25D366",color:"#fff",border:"none",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",flexShrink:0}}>
                  {WA_ICON}{t.notifyBtn} ({sellers.filter(s=>s.phone).length})
                </button>
                <button onClick={()=>setLastPublished(null)} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:16,padding:"0 4px"}}>✕</button>
              </div>}
              {proposals.length===0?<Empty>{t.noProposals}</Empty>:proposals.map(mapP).map(p=>{
                const s=getStats(p.id);
                return(
                  <div key={p.id} style={{border:"1px solid #ebebeb",marginBottom:8,display:"flex",overflow:"hidden"}}>
                    {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:80,height:80,objectFit:"cover",flexShrink:0}}/>:<div style={{width:80,height:80,background:"#f5f5f5",flexShrink:0}}/>}
                    <div style={{flex:1,padding:"11px 14px"}}>
                      <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#bbb",margin:"0 0 3px"}}>{p.type} · {p.format}</p>
                      <p style={{fontSize:18,fontStyle:"italic",margin:"0 0 5px",color:"#2a2a2a"}}>{p.name}</p>
                      {p.price&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:12,color:"#999",margin:"0 0 1px"}}>{t.buyLabel} {p.price}</p>}
                      {p.salePrice&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:12,color:"#2e7d4f",margin:0}}>{t.saleLabel} {p.salePrice}</p>}
                    </div>
                    <div style={{padding:"11px 14px",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"space-between",flexShrink:0,minWidth:90}}>
                      <div style={{textAlign:"right"}}>
                        <p style={{fontFamily:"'Lato',sans-serif",fontSize:12,margin:"0 0 2px"}}><span style={{color:"#2e7d4f",fontWeight:700}}>✓{s.yes}</span><span style={{color:"#9e2a2a",fontWeight:700,marginLeft:8}}>✗{s.no}</span></p>
                        <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,color:"#bbb",margin:"0 0 6px"}}>{s.total}/{s.maxVotes}</p>
                        {p.status==="archived"?<span style={{fontFamily:"'Lato',sans-serif",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"#fff",background:"#aaa",padding:"2px 7px"}}>{t.statusArchived}</span>:<span style={{fontFamily:"'Lato',sans-serif",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"#2e7d4f",border:"1px solid #2e7d4f",padding:"2px 7px"}}>{t.statusActive}</span>}
                      </div>
                      <div style={{display:"flex",gap:10,marginTop:8}}>
                        {p.status==="active"&&<button onClick={()=>handleArchiveProposal(p.id)} style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:"#888",background:"none",border:"none",cursor:"pointer",padding:0}}>{t.archiveBtn}</button>}
                        <button onClick={()=>handleDeleteProposal(p.id)} style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:"#ccc",background:"none",border:"none",cursor:"pointer",padding:0}}>{t.deleteBtn}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>}

            {activeTab==="results"&&<div>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0 18px",borderBottom:"1px solid #f0f0f0",marginBottom:16}}>
                <span style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",whiteSpace:"nowrap"}}>{t.buyerPhoneLabel}</span>
                <input style={{...inp,flex:1,padding:"7px 12px",fontSize:13}} placeholder={t.buyerPhonePh} value={buyerPhone} onChange={e=>{setBuyerPhone(e.target.value);localStorage.setItem("buyer_phone",e.target.value);}}/>
              </div>
              {proposals.length===0?<Empty>{t.noProposals}</Empty>:proposals.map(mapP).map(p=>{
                const s=getStats(p.id),pv=votes[p.id]||{},pSellers=getSellers(p);
                return(
                  <div key={p.id} style={{border:"1px solid #ebebeb",marginBottom:16,overflow:"hidden"}}>
                    <div style={{background:"#2a2a2a",color:"#fff",padding:"11px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:17,fontStyle:"italic",fontWeight:300}}>{p.name}</span>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        {p.audience==="team_leaders"&&<span style={{fontFamily:"'Lato',sans-serif",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"#aaa",border:"1px solid #555",padding:"2px 7px"}}>{t.teamLeader}</span>}
                        <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#aaa"}}>{s.total}/{s.maxVotes} {t.votes}</span>
                      </div>
                    </div>
                    <div style={{padding:"14px 16px"}}>
                      <div style={{marginBottom:14}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Lato',sans-serif",fontSize:12,marginBottom:5}}>
                          <span style={{color:"#2e7d4f",fontWeight:700}}>✓ {s.yes} {t.favorable}</span>
                          <span style={{color:"#9e2a2a",fontWeight:700}}>✗ {s.no} {t.against}</span>
                        </div>
                        <div style={{height:4,background:"#f0f0f0",overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${s.pct}%`,background:s.pct>=60?"#2e7d4f":s.pct>=40?"#c8a000":"#9e2a2a"}}/>
                        </div>
                        <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,color:"#bbb",margin:"4px 0 0"}}>{s.pct}{t.pctFav}</p>
                      </div>
                      <div style={{borderTop:"1px solid #f0f0f0",paddingTop:14,marginBottom:14}}>
                        <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",margin:"0 0 10px"}}>{t.decisionTitle}</p>
                        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                          {[["buy",t.buyDecision,"#2e7d4f"],["pass",t.passDecision,"#9e2a2a"]].map(([val,label,col])=>(
                            <button key={val} onClick={()=>setDecisions(d=>({...d,[p.id]:decisions[p.id]===val?null:val}))}
                              style={{padding:"10px 16px",border:`1px solid ${decisions[p.id]===val?col:"#e8e8e8"}`,background:decisions[p.id]===val?col:"#fff",color:decisions[p.id]===val?"#fff":"#999",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}>
                              {label}
                            </button>
                          ))}
                        </div>
                        {decisions[p.id]&&<div style={{marginTop:12}}>
                          <textarea placeholder={t.adminCommentPh} value={adminComments[p.id]||""} onChange={e=>setAdminComments(d=>({...d,[p.id]:e.target.value}))} style={{...inp,height:72,resize:"vertical",fontSize:13}}/>
                        </div>}
                        {decisions[p.id]&&<div style={{marginTop:10}}>
                          <button onClick={()=>sendToWhatsApp(p,s,decisions[p.id])} style={{padding:"10px 18px",background:"#25D366",color:"#fff",border:"none",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>
                            {WA_ICON}{t.sendToBuyer}
                          </button>
                        </div>}
                      </div>
                      {TEAMS.map(team=>{
                        const tS=pSellers.filter(sel=>sellers.find(s=>s.name===sel)?.teams?.includes(team));
                        if(tS.length===0) return null;
                        const tY=tS.filter(sel=>pv[sel]?.vote==="yes").length,tN=tS.filter(sel=>pv[sel]?.vote==="no").length;
                        const tV=tY+tN,tP=tV?Math.round((tY/tV)*100):null;
                        return(
                          <div key={team} style={{marginBottom:16}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                              <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",margin:0}}>{team}</p>
                              <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#888",margin:0}}>
                                <span style={{color:"#2e7d4f",fontWeight:700}}>✓{tY}</span>
                                <span style={{color:"#9e2a2a",fontWeight:700,marginLeft:8}}>✗{tN}</span>
                                {tP!==null&&<span style={{marginLeft:10,color:tP>=60?"#2e7d4f":tP>=40?"#c8a000":"#9e2a2a",fontWeight:700}}>{tP}%</span>}
                              </p>
                            </div>
                            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                              {tS.map(sel=>{
                                const sv=pv[sel];
                                return(
                                  <div key={sel} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:sv?(sv.vote==="yes"?"#f4fbf7":"#fdf4f4"):"#fafafa",borderLeft:`3px solid ${sv?(sv.vote==="yes"?"#2e7d4f":"#9e2a2a"):"#e8e8e8"}`}}>
                                    <div style={{flex:1,minWidth:0}}>
                                      <p style={{fontFamily:"'Lato',sans-serif",fontSize:12,fontWeight:700,color:"#454545",margin:0}}>{sel}</p>
                                      {sv?.comment&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#999",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{sv.comment}"</p>}
                                      {!sv&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#ccc",margin:0}}>{t.pending}</p>}
                                    </div>
                                    <span style={{fontSize:13,flexShrink:0,color:sv?(sv.vote==="yes"?"#2e7d4f":"#9e2a2a"):"#ccc"}}>{sv?(sv.vote==="yes"?"✓":"✗"):"·"}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>}

            {activeTab==="sellers"&&<div>
              <h2 style={{fontSize:24,fontWeight:300,fontStyle:"italic",margin:"0 0 20px",color:"#2a2a2a"}}>{t.sellersTitle}</h2>
              <div style={{background:"#fafafa",border:"1px solid #ebebeb",padding:"14px 16px",marginBottom:24}}>
                <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",margin:"0 0 10px"}}>{t.regCodeTitle}</p>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <input style={{...inp,flex:1,fontWeight:700,letterSpacing:4,fontSize:16}} placeholder="—" value={regCode} onChange={e=>{setRegCode(e.target.value);localStorage.setItem(REG_CODE_KEY,e.target.value);}}/>
                  <Btn onClick={()=>{const code=Math.random().toString(36).substring(2,8).toUpperCase();setRegCode(code);localStorage.setItem(REG_CODE_KEY,code);showToast(t.newCode+code);}}>{t.generate}</Btn>
                </div>
                <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#bbb",margin:"8px 0 0"}}>{t.regCodeNote}</p>
                {regCode&&<button onClick={()=>{const url=window.location.href.split("?")[0];window.open("https://wa.me/?text="+encodeURIComponent(t.inviteMsg(regCode,url)),"_blank");}}
                  style={{marginTop:12,display:"flex",alignItems:"center",gap:8,padding:"10px 16px",background:"#25D366",color:"#fff",border:"none",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer"}}>
                  {WA_ICON}{t.sendInvite}
                </button>}
              </div>
              <div style={{display:"flex",gap:10,marginBottom:24}}>
                <input style={{...inp,flex:1}} placeholder={t.addSellerPh} value={newSellerName} onChange={e=>setNewSellerName(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&newSellerName.trim()){if(sellers.find(s=>s.name.toLowerCase()===newSellerName.trim().toLowerCase())){showToast(t.addedErr,"err");return;}saveSellers([...sellers,{name:newSellerName.trim(),isTeamLeader:false,teams:[]}]);setNewSellerName("");showToast(t.addedOk);}}}/>
                <Btn onClick={()=>{if(!newSellerName.trim())return;if(sellers.find(s=>s.name.toLowerCase()===newSellerName.trim().toLowerCase())){showToast(t.addedErr,"err");return;}saveSellers([...sellers,{name:newSellerName.trim(),isTeamLeader:false,teams:[]}]);setNewSellerName("");showToast(t.addedOk);}}>{t.add}</Btn>
              </div>
              {sellers.map((seller,idx)=>(
                <div key={idx} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",border:"1px solid #ebebeb",marginBottom:6,background:"#fff"}}>
                  <div style={{flex:1}}>
                    <span style={{fontSize:15,fontStyle:"italic",color:"#2a2a2a"}}>{seller.name}</span>
                    {seller.isTeamLeader&&<span style={{fontFamily:"'Lato',sans-serif",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"#fff",background:"#454545",padding:"2px 7px",marginLeft:8}}>{t.teamLeader}</span>}
                    {seller.teams?.length>0&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#bbb",margin:"2px 0 0"}}>{seller.teams.join(" · ")}{seller.phone?` · 📱 ${seller.phone}`:" · 📵 no WhatsApp"}</p>}
                  </div>
                  <button onClick={()=>{const u=sellers.map((s,i)=>i===idx?{...s,isTeamLeader:!s.isTeamLeader}:s);saveSellers(u);}} style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:seller.isTeamLeader?"#9e2a2a":"#454545",background:"none",border:`1px solid ${seller.isTeamLeader?"#f5c6c6":"#e0e0e0"}`,padding:"5px 10px",cursor:"pointer"}}>{seller.isTeamLeader?t.removeTL:t.makeTL}</button>
                  <button onClick={()=>{saveSellers(sellers.filter((_,i)=>i!==idx));showToast(t.removeOk);}} style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:"#ccc",background:"none",border:"none",cursor:"pointer",padding:0}}>{t.deleteBtn}</button>
                </div>
              ))}
              <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#bbb",marginTop:16}}>{sellers.length} {t.tabSellers} · {sellers.filter(s=>s.isTeamLeader).length} {t.teamLeader}</p>
            </div>}
          </>}
        </div>}

        {/* REGISTER */}
        {view==="register"&&<div style={{paddingTop:36}}>
          {regDone||(selectedSeller&&sellers.find(s=>s.name===selectedSeller))?(
            <div style={{maxWidth:380,margin:"40px auto",textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>✓</div>
              <p style={ey}>{t.activeSession}</p>
              <h2 style={{fontSize:26,fontWeight:300,fontStyle:"italic",margin:"10px 0 8px",color:"#2a2a2a"}}>{selectedSeller}</h2>
              <p style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:"#999",marginBottom:20}}>
                {currentSeller?.teams?.join(", ")||""}{currentSeller?.isTeamLeader?` · ${t.teamLeader}`:""}
              </p>
              <div style={{marginBottom:24}}>
                <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",marginBottom:12}}>{t.langLabel}</p>
                <LangSwitcher/>
              </div>
              <Btn outline onClick={()=>{setSelectedSeller("");setRegDone(false);setRegForm({name:"",code:"",teams:[],phone:""});localStorage.removeItem("fav_seller");}}>{t.changeUser}</Btn>
            </div>
          ):(
            <div style={{maxWidth:380,margin:"0 auto"}}>
              <p style={ey}>{t.regSub}</p>
              <h2 style={{fontSize:28,fontWeight:300,fontStyle:"italic",margin:"10px 0 28px",color:"#2a2a2a"}}>{t.regTitle}</h2>
              <Lbl>{t.nameLabel}</Lbl>
              <input style={inp} placeholder={t.namePh} value={regForm.name} onChange={e=>setRegForm(f=>({...f,name:e.target.value}))}/>
              <Lbl>{t.codeLabel}</Lbl>
              <input style={inp} placeholder={t.codePh} value={regForm.code} onChange={e=>setRegForm(f=>({...f,code:e.target.value}))}/>
              <Lbl>{t.teamLabel}</Lbl>
              <div style={{display:"flex",gap:8}}>
                {TEAMS.map(tm=>(
                  <button key={tm} type="button" onClick={()=>{const teams=regForm.teams.includes(tm)?regForm.teams.filter(x=>x!==tm):[...regForm.teams,tm];setRegForm(f=>({...f,teams}));}}
                    style={{flex:1,padding:"12px 8px",border:`1px solid ${regForm.teams.includes(tm)?"#454545":"#e8e8e8"}`,background:regForm.teams.includes(tm)?"#454545":"#fff",color:regForm.teams.includes(tm)?"#fff":"#999",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}>
                    {tm}
                  </button>
                ))}
              </div>
              <Lbl>{t.phoneLabel}</Lbl>
              <input style={inp} placeholder={t.phonePh} value={regForm.phone} onChange={e=>setRegForm(f=>({...f,phone:e.target.value}))} inputMode="tel"/>
              <p style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#bbb",margin:"6px 0 0",lineHeight:1.6}}>{t.phoneNote}</p>
              <Lbl>{t.langLabel}</Lbl>
              <LangSwitcher/>
              <div style={{marginTop:28}}><Btn onClick={handleRegister}>{t.registerBtn}</Btn></div>
            </div>
          )}
        </div>}

        {/* VOTE */}
        {view==="vote"&&<div style={{paddingTop:28}}>
          {!selectedProposal?<>
            <p style={ey}>{t.activeProposals}</p>
            <h2 style={{fontSize:24,fontWeight:300,fontStyle:"italic",margin:"10px 0 24px",color:"#2a2a2a"}}>{t.chooseVote}</h2>
            {activeProposals.length===0?<Empty>{t.noActive}</Empty>:activeProposals.map(p=>{
              const s=getStats(p.id),myVote=selectedSeller?votes[p.id]?.[selectedSeller]:null;
              return(
                <div key={p.id} onClick={()=>{setSelectedProposal(mapP(p));setVoteForm({vote:null,comment:""});  }}
                  style={{border:"1px solid #ebebeb",marginBottom:8,display:"flex",cursor:"pointer",overflow:"hidden",transition:"border-color 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#c8b89a"} onMouseLeave={e=>e.currentTarget.style.borderColor="#ebebeb"}>
                  {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:90,objectFit:"cover",flexShrink:0}}/>:<div style={{width:90,background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"#ddd",fontSize:24}}>◈</span></div>}
                  <div style={{flex:1,padding:"12px 14px"}}>
                    <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#bbb",margin:"0 0 4px"}}>{p.type} · {p.format}</p>
                    <p style={{fontSize:18,fontStyle:"italic",margin:"0 0 6px",color:"#2a2a2a"}}>{p.name}</p>
                    {p.price&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:12,color:"#999",margin:"0 0 2px"}}>{t.buyLabel} {p.price}</p>}
                    <div style={{display:"flex",alignItems:"center",gap:10,marginTop:4}}>
                      <span style={{fontFamily:"'Lato',sans-serif",fontSize:11,color:"#bbb"}}>{s.total}/{s.maxVotes} {t.votes}</span>
                      {myVote&&<span style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:myVote.vote==="yes"?"#2e7d4f":"#9e2a2a",fontWeight:700}}>{myVote.vote==="yes"?t.votedYes:t.votedNo}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </>:<>
            <button onClick={()=>setSelectedProposal(null)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#bbb",marginBottom:20,padding:0}}>{t.backToList}</button>
            <div style={{border:"1px solid #ebebeb",marginBottom:24,overflow:"hidden"}}>
              {selectedProposal.images?.length>0&&<>
                <div style={{maxHeight:260,overflow:"hidden",cursor:"pointer"}} onClick={()=>setLightbox({urls:selectedProposal.images,index:0})}>
                  <img src={selectedProposal.images[0]} alt="" style={{width:"100%",objectFit:"cover",display:"block"}}/>
                </div>
                {selectedProposal.images.length>1&&<div style={{display:"flex",gap:2,padding:"2px",background:"#e0e0e0"}}>
                  {selectedProposal.images.map((url,idx)=>(
                    <img key={idx} src={url} alt="" onClick={()=>setLightbox({urls:selectedProposal.images,index:idx})}
                      style={{width:54,height:40,objectFit:"cover",cursor:"pointer",opacity:0.75}}
                      onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.75"}/>
                  ))}
                </div>}
              </>}
              <div style={{padding:"16px 18px"}}>
                <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#bbb",margin:"0 0 6px"}}>{selectedProposal.type} · {selectedProposal.format}</p>
                <h2 style={{fontSize:22,fontWeight:300,fontStyle:"italic",margin:"0 0 12px",color:"#2a2a2a"}}>{selectedProposal.name}</h2>
                <div style={{display:"flex",flexWrap:"wrap",gap:"4px 22px",fontFamily:"'Lato',sans-serif",fontSize:13,color:"#888"}}>
                  {selectedProposal.price&&<span>{t.buyLabel} <strong style={{color:"#454545",fontWeight:400}}>{selectedProposal.price}</strong></span>}
                  {selectedProposal.salePrice&&<span>{t.saleLabel} <strong style={{color:"#2e7d4f",fontWeight:400}}>{selectedProposal.salePrice}</strong></span>}
                  {selectedProposal.size&&<span>{t.sizesLabel} <strong style={{color:"#454545",fontWeight:400}}>{selectedProposal.size}</strong></span>}
                </div>
                {selectedProposal.notes&&<p style={{fontFamily:"'Lato',sans-serif",fontSize:13,color:"#888",margin:"10px 0 0",lineHeight:1.7,borderTop:"1px solid #f0f0f0",paddingTop:10}}>{selectedProposal.notes}</p>}
                {selectedProposal.videoUrl&&<a href={selectedProposal.videoUrl} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:7,marginTop:12,padding:"9px 16px",background:"#f5f5f5",border:"1px solid #e0e0e0",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"#454545",textDecoration:"none"}}>
                  {t.watchVideo}
                </a>}
              </div>
            </div>
            <div style={{border:"1px solid #ebebeb",padding:"18px"}}>
              <h3 style={{fontSize:18,fontWeight:300,fontStyle:"italic",margin:"0 0 16px",color:"#2a2a2a"}}>{t.yourOpinion}</h3>
              <Lbl>{t.whoAreYou}</Lbl>
              <select style={inp} value={selectedSeller} onChange={e=>{setSelectedSeller(e.target.value);localStorage.setItem("fav_seller",e.target.value);}}>
                <option value="">{t.selectName}</option>
                {SELLERS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              {alreadyVoted&&selectedSeller&&<div style={{fontFamily:"'Lato',sans-serif",fontSize:12,color:"#c8a000",margin:"10px 0",padding:"9px 12px",background:"#fffdf0",border:"1px solid #f0e68c"}}>{t.alreadyVoted}</div>}
              <Lbl>{t.voteLabel}</Lbl>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[["yes",t.yesVote,"#2e7d4f"],["no",t.noVote,"#9e2a2a"]].map(([val,label,col])=>(
                  <button key={val} onClick={()=>setVoteForm(f=>({...f,vote:val}))}
                    style={{padding:"14px 10px",border:`1px solid ${voteForm.vote===val?col:"#e8e8e8"}`,background:voteForm.vote===val?col:"#fff",color:voteForm.vote===val?"#fff":"#999",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}>
                    {label}
                  </button>
                ))}
              </div>
              <Lbl>{t.commentLabel}</Lbl>
              <textarea style={{...inp,height:80,resize:"vertical"}} placeholder={t.commentPh} value={voteForm.comment} onChange={e=>setVoteForm(f=>({...f,comment:e.target.value}))}/>
              <div style={{marginTop:20}}><Btn onClick={handleVote}>{t.sendVote}</Btn></div>
            </div>
          </>}
        </div>}

      </div>

      <footer style={{borderTop:"1px solid #e8e8e8",padding:"22px 20px",textAlign:"center"}}>
        <img src="https://www.granitifavorita.com/images/logo-favorita.png" alt="Favorita" style={{height:20,opacity:0.3}} onError={e=>e.target.style.display="none"}/>
        <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#ccc",marginTop:10}}>Favorita Stone Pick</p>
      </footer>

      {lightbox&&<div onClick={()=>setLightbox(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <img src={lightbox.urls[lightbox.index]} alt="" style={{maxWidth:"94vw",maxHeight:"80vh",objectFit:"contain"}} onClick={e=>e.stopPropagation()}/>
        {lightbox.urls.length>1&&<div style={{display:"flex",gap:6,marginTop:14}}>
          {lightbox.urls.map((url,idx)=>(
            <img key={idx} src={url} alt="" onClick={e=>{e.stopPropagation();setLightbox(l=>({...l,index:idx}));}}
              style={{width:48,height:36,objectFit:"cover",cursor:"pointer",opacity:idx===lightbox.index?1:0.35,outline:idx===lightbox.index?"1px solid #fff":"none"}}/>
          ))}
        </div>}
        <button onClick={()=>setLightbox(null)} style={{marginTop:16,color:"#666",background:"none",border:"none",fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer"}}>{t.closeBtn}</button>
      </div>}

      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{-webkit-font-smoothing:antialiased;}select,textarea,input{-webkit-appearance:none;appearance:none;}`}</style>
    </div>
  );
}

const ey={fontFamily:"'Lato',sans-serif",fontSize:10,color:"#bbb",letterSpacing:3,textTransform:"uppercase",marginBottom:0};
const inp={width:"100%",padding:"10px 13px",border:"1px solid #e0e0e0",borderRadius:0,fontSize:14,fontFamily:"'Lato',sans-serif",background:"#fff",outline:"none",color:"#454545",boxSizing:"border-box",display:"block",fontWeight:300};

function Btn({children,onClick,outline,disabled}){
  return <button onClick={onClick} disabled={disabled} style={{padding:"11px 26px",background:outline?"transparent":"#454545",color:outline?"#454545":"#fff",border:outline?"1px solid #454545":"none",fontFamily:"'Lato',sans-serif",fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{children}</button>;
}
function Lbl({children}){return <p style={{fontFamily:"'Lato',sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#aaa",margin:"16px 0 7px"}}>{children}</p>;}
function Empty({children}){return <div style={{textAlign:"center",padding:"40px 0",fontFamily:"'Lato',sans-serif",fontSize:13,color:"#ccc"}}>{children}</div>;}
