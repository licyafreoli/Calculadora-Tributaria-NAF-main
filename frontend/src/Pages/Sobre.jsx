import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EMAIL = import.meta.env.VITE_NAF_EMAIL || '';

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="text-3xl font-bold">Sobre o projeto</h1>
        <p className="mt-4">
          Calculadora acadêmica para apoiar educação fiscal e comparar estimativas tributárias de profissionais autônomos.
          Projeto vinculado ao Núcleo de Apoio Contábil e Fiscal da Universidade Christus.
        </p>

        {EMAIL ? (
          <a
            className="mt-5 inline-block rounded bg-naf-blue px-4 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2"
            href={'mailto:' + EMAIL + '?subject=Duvida%20sobre%20a%20calculadora'}
          >
            Enviar dúvida ao NAF
          </a>
        ) : (
          <p className="mt-5 rounded border border-dashed border-gray-400 bg-white p-4 text-sm text-gray-700">
            E-mail do NAF pendente de validação pela equipe. O valor deve ser informado em variável de ambiente local.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
