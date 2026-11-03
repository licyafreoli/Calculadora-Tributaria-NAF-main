import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Página não encontrada</h1><p className="my-4">Confira o endereço ou volte à calculadora.</p><Link className="font-bold underline" to="/">Voltar à calculadora</Link></main>}
