import React, {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories = async() => {
      const {data} = await api.get('/repositories');
      setRepositories(data);
    };

    getRepositories();
  },[]);

  async function handleAddRepository() {
    const { data } = await api.post(`/repositories`, { title: "Bruno", url: "test.test", techs: ["Nodejs", "Typescript"]});

    setRepositories([data, ...repositories]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => {
      if(repository.id !== id) {
        return repository;
      }
    });

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
