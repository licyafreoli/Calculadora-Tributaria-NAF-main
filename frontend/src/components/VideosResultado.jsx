const videos = {
  'Pessoa Física (PF)': {
    titulo: 'Entenda a opção Pessoa Física',
    arquivo: '/videos/pessoa-fisica.mp4',
  },
  'Pessoa Jurídica (PJ)': {
    titulo: 'Entenda a opção Pessoa Jurídica',
    arquivo: '/videos/pessoa-juridica.mp4',
  },
};

export default function VideosResultado({ melhorOpcao }) {
  const video = videos[melhorOpcao];
  if (!video) return null;
  return <section className="my-6 rounded-xl border bg-white p-4">
    <h2 className="mb-3 text-lg font-bold">{video.titulo}</h2>
    <video className="w-full rounded" controls preload="metadata">
      <source src={video.arquivo} type="video/mp4" />
      Seu navegador não conseguiu reproduzir este vídeo.
    </video>
  </section>;
}
