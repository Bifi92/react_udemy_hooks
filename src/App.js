import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');

  useEffect(
    ()=>{
      const tarefasStorage = localStorage.getItem('tarefas');
      if(tarefasStorage) { //se tem valor na variavel
        setTarefas(JSON.parse(tarefasStorage));
      }
    }
    ,[]
  ); //com o segundo parametro vazio, o trigger 'e a app.
     //executa quando monta a tela (componentDidMount)

  useEffect(
    ()=>{
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      return ()=>{}//executa quando desmontar o componente (componentWillUnmount)
    }
    , [tarefas]
  ); //executa quando o(os) componente passado no segundo parametro sofre alteracao (ComponentDidUpdate)

  const handleAdd = useCallback(
    ()=>{
      setTarefas([...tarefas, input])
      setInput('');
    }
    , [tarefas, input]
  ) //executa a funcao passada no primeiro parametro. O segundo parametro sao os hooks utilizados na funcao do primeiro.

  // function handleAdd(){
  //   setTarefas([...tarefas, input])
  //   setInput('');
  // }

  const totalTarefas = useMemo(()=>tarefas.length, [tarefas]); //Executa o primeiro parametro sempre que sempre que o segundo parametro sofre alteracao.

  return (
    <div>
      <ul>
        {tarefas.map(
            tarefa => (
              <li key={tarefa}>
                {tarefa}
              </li>
            )
          )
        }
      </ul>
      <br/>
      <strong>Voce tem {totalTarefas} tarefa(as)</strong>
      <br/>
      <input type='text' value={input} onChange={e=>setInput(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
