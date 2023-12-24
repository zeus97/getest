import React, {useState} from 'react'
import '@/styles/SearchForm.css'


interface Props{
    onSearch:(params:any)=> void,
}

function SearchForm({onSearch}:Props) {

    interface Values{
        searchID:string ,
        searchNombre:string,
        searchCargo: string
    }
    const initialValue:Values = {
        searchID:'',
        searchNombre:'',
        searchCargo:''
    };

    const [formData, setFormData] = useState(initialValue);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(formData.searchID?.length > 0 || formData.searchNombre.length > 0 || formData.searchCargo.length > 0){
            
            // searchFetch(1,formData.searchID,formData.searchNombre,formData.searchCargo)
            onSearch(formData);
        }
        setFormData(initialValue);
    }

  return (
    <form className='search-form'
    onSubmit={handleSubmit}>
        <input type='text'
        className='form-control'
        id='searchID'
        name='searchID'
        value={formData.searchID}
        onChange={handleChange}
        placeholder='ID...'
           />

        <input type='text'
        className='form-control'
        id='searchNombre'
        name='searchNombre'
        value={formData.searchNombre}
        onChange={handleChange}
        placeholder='Nombre...'
           />

        <select value={formData.searchCargo} name='searchCargo' onChange={handleChange}>
            <option value="0"></option>
            <option value="1">Gerente</option>
            <option value="2">Coordinador</option>
            <option value="3">Subdirector</option>
        </select>
        <button type='submit'>
            <i className="bi bi-search"></i>
        </button>
    </form>
  )
}

export default SearchForm