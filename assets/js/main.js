const navbtn = document.getElementById("navbtn");
const mobileNav = document.getElementById("mobileNav");

if (navbtn && mobileNav) {
  navbtn.addEventListener("click", () => {
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    navbtn.setAttribute("aria-expanded", String(!open));
    mobileNav.setAttribute("aria-hidden", String(open));
  });

  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.style.display = "none";
      navbtn.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== HERO SLIDER =====
const slides = document.querySelectorAll(".hero-slider .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

if (slides.length > 0) {
  showSlide(0); // garante que começa no primeiro
}

if (slides.length > 1) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 6000);
}

const camadasData = {
  stakeholders: {
    titulo: "Stakeholders",
    descricao:
      "Usuários, setores e agentes institucionais ocupam o centro do modelo. Suas necessidades orientam o desenvolvimento das soluções e dos serviços oferecidos.",
    itens: [
      "Estudantes",
      "Docentes",
      "Técnicos administrativos",
      "Gestores",
      "Setor de TI e infraestrutura",
      "Comunidade acadêmica e externa"
    ]
  },

  infraestrutura: {
    titulo: "Camada de Infraestrutura",
    descricao:
      "Representa a base física, digital e operacional que permite coletar, transmitir e armazenar dados no campus.",
    itens: [
      "Sensores e atuadores",
      "Rede elétrica e conectividade",
      "Dispositivos físicos do campus",
      "Gateways e servidores",
      "Laboratórios e ambientes técnicos"
    ]
  },

  tecnologia: {
    titulo: "Camada de Tecnologia",
    descricao:
      "Responsável por integrar, processar, proteger e transformar os dados coletados em informações úteis para o campus.",
    itens: [
      "IoT e LoRaWAN",
      "GPS e MQTT",
      "Bancos de dados",
      "APIs e integrações",
      "Dashboards e análise de dados",
      "Segurança da informação"
    ]
  },

  servicos: {
    titulo: "Camada de Serviços",
    descricao:
      "Representa as aplicações que entregam valor aos usuários, transformando dados e tecnologias em soluções úteis para o cotidiano acadêmico, administrativo e operacional.",
    itens: [
      "Monitoramento de energia e água",
      "Alertas e notificações",
      "Localização e monitoramento de ativos",
      "Dashboards administrativos",
      "Serviços de apoio à gestão",
      "Aplicações para ensino, pesquisa e extensão"
    ]
  }
};

const camadas = document.querySelectorAll(".camada");
const diagrama = document.querySelector(".camadas-diagrama");
const titulo = document.getElementById("camada-titulo");
const descricao = document.getElementById("camada-descricao");
const lista = document.getElementById("camada-lista");

function atualizarCamada(camadaSelecionada) {
  const dados = camadasData[camadaSelecionada];

  titulo.textContent = dados.titulo;
  descricao.textContent = dados.descricao;

  lista.innerHTML = "";

  dados.itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  camadas.forEach((camada) => {
    camada.classList.remove("active");

    if (camada.dataset.layer === camadaSelecionada) {
      camada.classList.add("active");
    }
  });

  diagrama.classList.add("has-active");
}

camadas.forEach((camada) => {
  camada.addEventListener("mouseenter", () => {
    atualizarCamada(camada.dataset.layer);
  });

  camada.addEventListener("click", () => {
    atualizarCamada(camada.dataset.layer);
  });
});

/* =========================================================
   PROTÓTIPOS IOT/LORAWAN - CARROSSEL
========================================================= */

const prototypeSlides = document.querySelectorAll(".prototype-slide");
const prototypeDots = document.querySelectorAll(".prototype-dot");
const prototypePrev = document.getElementById("prototypePrev");
const prototypeNext = document.getElementById("prototypeNext");

let currentPrototypeSlide = 0;

function showPrototypeSlide(index) {
  if (!prototypeSlides.length) return;

  currentPrototypeSlide = (index + prototypeSlides.length) % prototypeSlides.length;

  prototypeSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentPrototypeSlide);
  });

  prototypeDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentPrototypeSlide);
  });

  if (currentPrototypeSlide === 0 && window.prototipoMapa) {
    setTimeout(() => {
      window.prototipoMapa.invalidateSize();
    }, 200);
  }
}

if (prototypePrev && prototypeNext) {
  prototypePrev.addEventListener("click", () => {
    showPrototypeSlide(currentPrototypeSlide - 1);
  });

  prototypeNext.addEventListener("click", () => {
    showPrototypeSlide(currentPrototypeSlide + 1);
  });
}

prototypeDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showPrototypeSlide(Number(dot.dataset.slide));
  });
});

/* =========================================================
   CONFIGURAÇÃO DAS APIs
========================================================= */
const API_BASE_PAYLOADS = "https://ifsentral.online/src/api/buscar_payloads.php";

const DEVICE_ID_GPS = 8;
const DEVICE_ID_TANQUE = 10;

const API_GPS = `${API_BASE_PAYLOADS}?device_id=${DEVICE_ID_GPS}&limit=25`;
const API_TANQUE = `${API_BASE_PAYLOADS}?device_id=${DEVICE_ID_TANQUE}&limit=150`;

const API_KEY_GPS = "ebcc2212f58153439f8ee0fd1906801fd58d1c5a40279a5da310e9caefeb576a";
const API_KEY_TANQUE = "45744a6b1845d49ef0813cd8d8fcebece5bf87b566ea93b992402635858a4d8c";
/*
  Dados simulados.
  Eles aparecem caso a API ainda esteja vazia, fora do ar,
  bloqueada por CORS ou retornando algo que não seja JSON.
*/

const gpsSimulado = {
  lat: -26.9047,
  lng: -48.6616,
  atualizado_em: "Dado simulado"
};

const tanqueSimulado = {
  device: [
    {
      n: "model",
      v: "NIT 21LI"
    },
    {
      powertype: "battery"
    }
  ],
  drys: [],
  internal_humidity: 90.2,
  internal_sensors: [],
  internal_temperature: 28.39,
  lorawan: [],
  modules: []
};

/* =========================================================
   FUNÇÃO GENÉRICA PARA BUSCAR JSON
========================================================= */

async function buscarJSON(url, apiKey) {
  const resposta = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-Api-Key": apiKey
    }
  });

  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }

  const texto = await resposta.text();

  if (!texto.trim()) {
    throw new Error("A API retornou resposta vazia");
  }

  return JSON.parse(texto);
}

/* =========================================================
   GPS - MAPA DO BARCO-ESCOLA
========================================================= */

function normalizarRegistroGPS(registro) {
  /*
    A API pode retornar:
    [
      {
        payload: {
          location_tago: {
            latitude: -26.930686,
            longitude: -48.685316
          }
        },
        created_at: "2026-06-02 18:11:54"
      }
    ]

    Esta função coloca o conteúdo de payload no nível principal
    e preserva a data de criação.
  */

  const payload = registro.payload || registro;

  return {
    ...payload,
    timestamp: registro.created_at || registro.timestamp || payload.timestamp
  };
}

function normalizarDadosGPS(dados) {
  /*
    Aceita formatos como:

    1. Array vindo da API:
       [
         {
           payload: {
             location_tago: {
               latitude: -26.930686,
               longitude: -48.685316
             }
           },
           created_at: "2026-06-02 18:11:54"
         }
       ]

    2. Payload direto:
       {
         location_tago: {
           latitude: -26.930686,
           longitude: -48.685316
         }
       }

    3. Outros formatos comuns:
       { lat, lng }
       { latitude, longitude }
       { gps: { lat, lng } }
  */

  let lista = [];

  if (Array.isArray(dados)) {
    lista = dados;
  } else if (Array.isArray(dados?.data)) {
    lista = dados.data;
  } else {
    lista = [dados];
  }

  const registrosNormalizados = lista
    .map(normalizarRegistroGPS)
    .sort((a, b) => {
      const dataA = new Date(a.timestamp || 0).getTime();
      const dataB = new Date(b.timestamp || 0).getTime();
      return dataB - dataA;
    });

  const registroComGPS = registrosNormalizados.find((payload) => {
    const lat =
      payload.lat ??
      payload.latitude ??
      payload.gps?.lat ??
      payload.gps?.latitude ??
      payload.location_tago?.latitude;

    const lng =
      payload.lng ??
      payload.longitude ??
      payload.gps?.lng ??
      payload.gps?.longitude ??
      payload.location_tago?.longitude;

    return lat !== undefined && lng !== undefined;
  });

  if (!registroComGPS) {
    throw new Error("Nenhum payload de GPS com latitude/longitude encontrado");
  }

  const lat =
    registroComGPS.lat ??
    registroComGPS.latitude ??
    registroComGPS.gps?.lat ??
    registroComGPS.gps?.latitude ??
    registroComGPS.location_tago?.latitude;

  const lng =
    registroComGPS.lng ??
    registroComGPS.longitude ??
    registroComGPS.gps?.lng ??
    registroComGPS.gps?.longitude ??
    registroComGPS.location_tago?.longitude;

  return {
    lat: Number(lat),
    lng: Number(lng),
    atualizado_em:
      registroComGPS.timestamp ??
      registroComGPS.atualizado_em ??
      registroComGPS.updated_at ??
      registroComGPS.data_hora ??
      "Dado recebido da API",

    bateria: registroComGPS.BatV,
    temperatura: registroComGPS.Tem,
    umidade: registroComGPS.Hum,
    transporte: registroComGPS.Transport,
    alarme: registroComGPS.ALARM_status
  };
}

function atualizarGPS(dadosGPS) {
  const gpsLat = document.getElementById("gps-lat");
  const gpsLng = document.getElementById("gps-lng");
  const gpsStatus = document.getElementById("gps-status");
  const mapaElemento = document.getElementById("mapa-prototipo");

  if (gpsLat) gpsLat.textContent = dadosGPS.lat;
  if (gpsLng) gpsLng.textContent = dadosGPS.lng;
  if (gpsStatus) gpsStatus.textContent = dadosGPS.atualizado_em ?? "Dado recebido";

  if (!mapaElemento || typeof L === "undefined") return;

  if (!window.prototipoMapa) {
    window.prototipoMapa = L.map("mapa-prototipo").setView(
      [dadosGPS.lat, dadosGPS.lng],
      15
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(window.prototipoMapa);

    window.prototipoMarcador = L.marker([dadosGPS.lat, dadosGPS.lng]).addTo(
      window.prototipoMapa
    );
  } else {
    window.prototipoMapa.setView([dadosGPS.lat, dadosGPS.lng], 15);

    if (window.prototipoMarcador) {
      window.prototipoMarcador.setLatLng([dadosGPS.lat, dadosGPS.lng]);
    }
  }

  if (window.prototipoMarcador) {
    window.prototipoMarcador.bindPopup(`
      <strong>Barco-escola</strong><br>
      Latitude: ${dadosGPS.lat}<br>
      Longitude: ${dadosGPS.lng}
      ${dadosGPS.transporte ? `<br>Transporte: ${dadosGPS.transporte}` : ""}
      ${dadosGPS.bateria ? `<br>Bateria: ${dadosGPS.bateria} V` : ""}
    `);
  }
}

async function carregarDadosGPS() {
  try {
    const dados = await buscarJSON(API_GPS, API_KEY_GPS);

    console.log("Dados reais do GPS:", dados);

    const gps = normalizarDadosGPS(dados);

    atualizarGPS(gps);
  } catch (erro) {
    console.warn(
      "Não foi possível carregar o GPS pela API. Usando dado simulado.",
      erro
    );

    atualizarGPS(gpsSimulado);

    const gpsStatus = document.getElementById("gps-status");

    if (gpsStatus) {
      gpsStatus.textContent = "Dado simulado";
    }
  }
}

/* =========================================================
   SENSOR DO TANQUE - DS18B20 INTERNO E EXTERNO
========================================================= */

const SENSOR_TANQUE_INTERNO = "temperature_2898a275d013c57";
const SENSOR_TANQUE_EXTERNO = "temperature_28f250ee90045";

let ultimoTanqueInterno = null;
let ultimoTanqueExterno = null;
let ultimoTimestampInterno = null;
let ultimoTimestampExterno = null;
let tankChart24h = null;

function normalizarRegistroTanque(registro) {
  /*
    A API retorna uma lista assim:
    [
      {
        payload: {
          temperature_2898a275d013c57: 20.37,
          temperature_28f250ee90045: 22.37
        },
        created_at: "2026-06-07 18:16:36"
      }
    ]

    Esta função coloca o conteúdo de payload no nível principal
    e preserva a data.
  */

  const payload = registro.payload || registro;

  return {
    ...payload,
    timestamp: registro.created_at || registro.timestamp || payload.timestamp
  };
}

function obterPayloadsTanque(dados) {
  let lista = [];

  if (Array.isArray(dados)) {
    lista = dados;
  } else if (Array.isArray(dados?.data)) {
    lista = dados.data;
  } else {
    lista = [dados];
  }

  return lista
    .map(normalizarRegistroTanque)
    .sort((a, b) => {
      const dataA = new Date(a.timestamp || 0).getTime();
      const dataB = new Date(b.timestamp || 0).getTime();
      return dataB - dataA;
    });
}

function encontrarUltimoPayloadComSensor(payloads, sensor) {
  /*
    Procura o payload mais recente que contém aquele sensor específico.
    Isso resolve o caso em que um sensor não é reenviado porque o valor
    permaneceu igual para economia de bateria.
  */

  return payloads.find((payload) => payload[sensor] !== undefined);
}

function atualizarGaugeTanque(seletor, valor) {
  const gauge = document.querySelector(seletor);

  if (!gauge || valor === null || valor === undefined) return;

  /*
    Escala visual simples:
    0 a 50 °C.
  */
  const graus = Math.min(Math.max((Number(valor) / 50) * 360, 0), 360);

  gauge.style.setProperty("--gauge-value", `${graus}deg`);
}

function atualizarLeituraTanque(payloads) {
  /*
    Busca a última leitura válida de cada sensor separadamente.
    Assim, se o payload mais recente trouxer só o externo, o interno
    continua mostrando a última leitura válida encontrada anteriormente.
  */

  const payloadInterno = encontrarUltimoPayloadComSensor(
    payloads,
    SENSOR_TANQUE_INTERNO
  );

  const payloadExterno = encontrarUltimoPayloadComSensor(
    payloads,
    SENSOR_TANQUE_EXTERNO
  );

  if (payloadInterno) {
    ultimoTanqueInterno = Number(payloadInterno[SENSOR_TANQUE_INTERNO]);
    ultimoTimestampInterno = payloadInterno.timestamp;
  }

  if (payloadExterno) {
    ultimoTanqueExterno = Number(payloadExterno[SENSOR_TANQUE_EXTERNO]);
    ultimoTimestampExterno = payloadExterno.timestamp;
  }

  const tankInterno = document.getElementById("tank-interno");
  const tankExterno = document.getElementById("tank-externo");
  const tankStatus = document.getElementById("tank-status");

  if (tankInterno) {
    tankInterno.textContent =
      ultimoTanqueInterno !== null
        ? `${ultimoTanqueInterno.toFixed(2)} °C`
        : "--";
  }

  if (tankExterno) {
    tankExterno.textContent =
      ultimoTanqueExterno !== null
        ? `${ultimoTanqueExterno.toFixed(2)} °C`
        : "--";
  }

  if (tankStatus) {
    const ultimoTimestamp =
      ultimoTimestampInterno && ultimoTimestampExterno
        ? new Date(ultimoTimestampInterno) > new Date(ultimoTimestampExterno)
          ? ultimoTimestampInterno
          : ultimoTimestampExterno
        : ultimoTimestampInterno || ultimoTimestampExterno;

    tankStatus.textContent = ultimoTimestamp
      ? `Atualizado: ${ultimoTimestamp}`
      : "Aguardando sensores";
  }

  atualizarGaugeTanque(".gauge--tank-interno", ultimoTanqueInterno);
  atualizarGaugeTanque(".gauge--tank-externo", ultimoTanqueExterno);
}

function montarSerie24hTanque(payloads) {
  const agora = Date.now();
  const limite24h = agora - 24 * 60 * 60 * 1000;

  /*
    Primeiro filtra os payloads das últimas 24h.
    Depois ordena do mais antigo para o mais recente para montar o gráfico.
  */

  const pontos = payloads
    .filter((payload) => {
      if (!payload.timestamp) return false;

      const tempo = new Date(payload.timestamp).getTime();

      return (
        tempo >= limite24h &&
        (
          payload[SENSOR_TANQUE_INTERNO] !== undefined ||
          payload[SENSOR_TANQUE_EXTERNO] !== undefined
        )
      );
    })
    .sort((a, b) => {
      const dataA = new Date(a.timestamp).getTime();
      const dataB = new Date(b.timestamp).getTime();
      return dataA - dataB;
    });

  const labels = [];
  const dadosInterno = [];
  const dadosExterno = [];

  /*
    Esta parte é importante:
    se um payload não trouxe um dos sensores, o gráfico mantém o último
    valor conhecido daquele sensor. Isso representa que não houve nova
    transmissão daquele valor, e não necessariamente ausência de leitura.
  */

  let valorInternoAtual = null;
  let valorExternoAtual = null;

  pontos.forEach((ponto) => {
    if (ponto[SENSOR_TANQUE_INTERNO] !== undefined) {
      valorInternoAtual = Number(ponto[SENSOR_TANQUE_INTERNO]);
    }

    if (ponto[SENSOR_TANQUE_EXTERNO] !== undefined) {
      valorExternoAtual = Number(ponto[SENSOR_TANQUE_EXTERNO]);
    }

    const data = new Date(ponto.timestamp);

    labels.push(
      data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      })
    );

    dadosInterno.push(valorInternoAtual);
    dadosExterno.push(valorExternoAtual);
  });

  return {
    labels,
    dadosInterno,
    dadosExterno
  };
}

function atualizarGraficoTanque24h(payloads) {
  const canvas = document.getElementById("tank-chart-24h");

  if (!canvas || typeof Chart === "undefined") return;

  const { labels, dadosInterno, dadosExterno } = montarSerie24hTanque(payloads);

  if (!labels.length) return;

  const contexto = canvas.getContext("2d");

  if (!tankChart24h) {
    tankChart24h = new Chart(contexto, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Tanque interno",
            data: dadosInterno,
            borderColor: "#ff6a00",
            backgroundColor: "rgba(255, 106, 0, 0.12)",
            tension: 0.35,
            spanGaps: true
          },
          {
            label: "Tanque externo",
            data: dadosExterno,
            borderColor: "#1f9d55",
            backgroundColor: "rgba(31, 157, 85, 0.12)",
            tension: 0.35,
            spanGaps: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                if (context.parsed.y === null) {
                  return `${context.dataset.label}: sem leitura anterior`;
                }

                return `${context.dataset.label}: ${context.parsed.y} °C`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Temperatura (°C)"
            }
          },
          x: {
            title: {
              display: true,
              text: "Horário"
            }
          }
        }
      }
    });
  } else {
    tankChart24h.data.labels = labels;
    tankChart24h.data.datasets[0].data = dadosInterno;
    tankChart24h.data.datasets[1].data = dadosExterno;
    tankChart24h.update();
  }
}

function atualizarSensorTanque(dadosOriginais) {
  const payloads = obterPayloadsTanque(dadosOriginais);

  const payloadInterno = encontrarUltimoPayloadComSensor(
    payloads,
    SENSOR_TANQUE_INTERNO
  );

  const payloadExterno = encontrarUltimoPayloadComSensor(
    payloads,
    SENSOR_TANQUE_EXTERNO
  );

  const tankStatus = document.getElementById("tank-status");
  const tankJson = document.getElementById("tank-json");

  /*
    Se a API respondeu, mas nenhum dos últimos payloads trouxe os sensores
    DS18B20, o site mantém a última leitura válida já exibida.
  */

  if (!payloadInterno && !payloadExterno) {
    if (tankStatus) {
      tankStatus.textContent =
        ultimoTanqueInterno !== null || ultimoTanqueExterno !== null
          ? "Sem nova leitura. Mantendo último valor válido."
          : "Aguardando sensores";
    }

    return;
  }

  atualizarLeituraTanque(payloads);
  atualizarGraficoTanque24h(payloads);

  if (tankJson) {
    tankJson.textContent = JSON.stringify(
      {
        tanque_interno: {
          sensor: SENSOR_TANQUE_INTERNO,
          valor: ultimoTanqueInterno,
          atualizado_em: ultimoTimestampInterno
        },
        tanque_externo: {
          sensor: SENSOR_TANQUE_EXTERNO,
          valor: ultimoTanqueExterno,
          atualizado_em: ultimoTimestampExterno
        }
      },
      null,
      2
    );
  }
}

async function carregarDadosTanque() {
  try {
    const dados = await buscarJSON(API_TANQUE, API_KEY_TANQUE);

    console.log("Dados reais do tanque:", dados);

    atualizarSensorTanque(dados);
  } catch (erro) {
    console.warn(
      "Não foi possível carregar o sensor do tanque pela API. Mantendo última leitura válida.",
      erro
    );

    const tankStatus = document.getElementById("tank-status");

    if (tankStatus) {
      tankStatus.textContent =
        ultimoTanqueInterno !== null || ultimoTanqueExterno !== null
          ? "Erro ao atualizar. Mantendo último valor válido."
          : "Erro ao buscar API";
    }
  }
}

/* =========================================================
   INICIALIZAÇÃO DOS PROTÓTIPOS
========================================================= */

function iniciarPrototipos() {
  const existeSecaoPrototipo = document.getElementById("prototipo");

  if (!existeSecaoPrototipo) return;

  carregarDadosGPS();
  carregarDadosTanque();

  /*
    Atualiza automaticamente a cada 1 minuto.
    60000 ms = 1 minuto.
  */

  setInterval(() => {
    carregarDadosGPS();
    carregarDadosTanque();
  }, 60000);
}

iniciarPrototipos();
