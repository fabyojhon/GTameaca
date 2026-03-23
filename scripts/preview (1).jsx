import { useEffect, useState } from "react";
import { getManifestacoes, updateManifestacao } from "../services/api";
import CardManifestacao from "../components/CardManifestacao";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [toast, setToast] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const res = await getManifestacoes();
    setDados(res);
  }

  async function enviar(id, texto) {
    if (!texto) return;

    await updateManifestacao(id, {
      texto,
      status: "Respondido",
    });

    setToast("Salvo com sucesso!");
    setTimeout(() => setToast(""), 2000);

    carregar();
  }

  return (
    <div>
      <div className="header">
        <button className="btn" onClick={logout}>Sair</button>
        <strong>Detalhar Denúncia: 2026/0006</strong>
      </div>

      <div className="container">

        <div className="grid-top">
          <div>
            <div className="label">Registro</div>
            <div className="value">09/03/2026</div>
          </div>

          <div>
            <div className="label">Status</div>
            <div className="value">Parecer Gestor</div>
          </div>

          <div>
            <div className="label">Resultado</div>
            <div className="value">11/18</div>
          </div>

          <div>
            <div className="label">Classificação</div>
            <div className="value">Conflito interpessoal</div>
          </div>

          <div>
            <div className="label">Dependência</div>
            <div className="value">8910 - Gepes Atendimento</div>
          </div>

          <div>
            <div className="label">Risco</div>
            <div className="badge">Baixo potencial lesivo</div>
          </div>
        </div>

        {dados.map((item) => (
          <CardManifestacao
            key={item.id}
            item={item}
            onEnviar={enviar}
          />
        ))}

      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}