import { useState } from 'react'
import {ContainerBody, Form, ContainerRepo, Repo, ContainerImage } from './styles'
import { api } from '../service/api'

import { FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'

export function ListRepo(){

    const [input, setInput] = useState('');
    const [repositories, setRepositories] = useState([])

    async function handleAddRepotory(e){
        e.preventDefault();

        //descripition
        //full_name
        //ower: avatar_url

        try{        
            const response = await api.get(`repos/${input}`)
            const data = response.data;

            const isExists = repositories.find(reportory => reportory.full_name === data.full_name);

            if(isExists){
                toast.warn('Este repositório ja foi adicionado')

                return;
            }


            
            setRepositories([...repositories, data])
            toast.success('Repositório adicionado com sucesso')
        }catch(err){
            toast.error('Este repositório não existe')
            
        }
    }

    function handleDeleteRepository(id){
        const repositoryDeleted = repositories.filter(repository =>{
            return repository.full_name !== id

        })

        setRepositories(repositoryDeleted);
    }

    return(
        <ContainerBody>
            <Form onSubmit={handleAddRepotory}>
                <input type="text" placeholder="Exemplo: usuário/repositório" value={input} onChange={e => setInput(e.target.value)}/>
                <button type="submit">Adicionar</button>
            
            </Form> 
            <ContainerRepo>
                {repositories.map(repository => (
                    <Repo key={repository.full_name}>
                        <ContainerImage>
                            <img src={repository.owner.
                            avatar_url} alt={repository.owner.login} />
                        </ContainerImage> 
                        <span>
                            <h1>{repository.full_name}</h1>
                            <FiTrash color="#c53e00" fontSize="1.5rem" cursor={"pointer"} onClick={()=> handleDeleteRepository(repository.full_name)}/>
                        </span>                    
                            <p>{repository.description}</p>
                    </Repo>
               
                
                ))}
                
            </ContainerRepo>
        </ContainerBody>
    );
}

