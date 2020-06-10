import React,  {useEffect, useState}from 'react';
import './CreatePoint.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import DropZone from '../../components/DropZone';

const CreatePoint = () => {

    const [items, setItems ] = useState([]);
    const [ufs, setUfs ] = useState([]);
    const [selectedUf, setSelectedUf ] = useState(0);
    const [cities, setCities ] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState([0,0]);
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position =>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(()=>{
        api.get('item').then(response => {
            console.log(response.data);
            setItems(response.data);
        });
    }, []);

    useEffect(()=>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
            const siglas = response.data.map(uf => uf.sigla);
            setUfs(siglas);
            
        });
    }, []);

    useEffect(()=>{
       if(selectedUf === 0){
           return;
       }

       axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cidades = response.data.map(city => city.nome);
            setCities(cidades);
        });
    }, [selectedUf]);



    function handleSelectUf(event){

        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event){

        var c = event.target.value;
        setSelectedCity(c);
    }

    function handleMapClick(event){
        setSelectedPosition([ event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event){
        const { name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    }

    function handleSelectItem(id){

        const alreadySelectedItem = selectedItems.findIndex(item => item === id);
        
        if(alreadySelectedItem >= 0){
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else
        {
            setSelectedItems([...selectedItems, id]);
        }
        
    }

    async function handleSubmit(event){
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('items', items);
        if(selectedFile)
        {
            data.append('image', selectedFile);
        }
        
        
        const ponto = await api.post('point/create', data);
        if(ponto)
        {
            alert("ponto de coleta criado");
        }
        history.push('/');
        
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home 
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta.</h1>
                <DropZone onFileUpload={setSelectedFile} />
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    
                    <div className="field">
                        <label htmlFor="name">
                            Nome da Entidade:
                        </label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>
                    <div className="field">
                        <label htmlFor="email">
                            E-mail:
                        </label>
                        <input type="text" name="email" id="email" onChange={handleInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">
                            Whatsapp:
                        </label>
                        <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                    </div> 
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>


                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {
                                    ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {
                                    cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items.map(item => (
                                <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected': ''}
                                >
                                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Test"/>
                                    <span>{item.title}</span>
                                </li>
                            ))
                        }
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;