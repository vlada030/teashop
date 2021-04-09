import {useState} from 'react';
import axios from 'axios';
import {useGlobalContext} from '../context/global_context';


const useUpdateProduct = () => {

    const [product, setProduct] = useState(null);
    const [findId, setFindId] = useState('');
    const {openModal, closeModal} = useGlobalContext();

    const findProductSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios(`/allproducts/${findId}`);
            //console.log(data);
            closeModal();
            setProduct(data.data);
        } catch (error) {
            if (error.response) {
                openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});

            } else {
            // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
            openModal({showModal: true, modalMsg: error.message, modalError: true});
            }        
        }
    }

    const updateProductSubmit = async (e) => {
        e.preventDefault();

        try {
            // eslint-disable-next-line
            const { data } = await axios({
                url: `/allproducts/${product.id}`,
                method: 'PUT',
                data: product
            });
            //console.log(data);
            setProduct(null);
            openModal({showModal: true, modalMsg: 'Proizvod uspešno izmenjen.', modalError: false});
        } catch (error) {
            if (error.response) {
                openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});    
            } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: error.message, modalError: true});
            }        
        }
    }

    return {product, findId, findProductSubmit, updateProductSubmit, setProduct, setFindId};
}

export default useUpdateProduct;
