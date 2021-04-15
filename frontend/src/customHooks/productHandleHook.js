import {useState} from 'react';
import axios from 'axios';
import {useGlobalContext} from '../context/global_context';

const useProductHandle = () => {

    const [product, setProduct] = useState(null);
    const [findId, setFindId] = useState('');
    const {openModal, closeModal} = useGlobalContext();

    const resetForm = () => {
        setProduct(null);
        closeModal();
    }

    const updatePropertyValue = (name, value) => {
        // update array of packages
        if (name.startsWith('package')) {
            let arrOfPackages = [...product.package];
            const unit = name.replace('package-', '')
            
            // toggle unit
            if (arrOfPackages.includes(unit)) {
                arrOfPackages = arrOfPackages.filter(item => item !== unit);
            } else {
                arrOfPackages.push(unit);
            }

            return setProduct({...product, package: arrOfPackages});
        } 

        setProduct({...product, [name]: value});
    }

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

    const axiosUpdateProductFromStripe = async (arrProducts) => {
        arrProducts.forEach(async product => {
            const updatedId = product.id.substring(0, 5);
            const updatedStock = product.amount * parseInt(product.unit)
            
            try {
                // eslint-disable-next-line
                const { data } = await axios({
                    url: `/allproducts/${updatedId}`,
                    method: 'PATCH',
                    data: {stock: updatedStock}
                });
                console.log(data);
                openModal({showModal: true, modalMsg: 'Proizvod uspešno izmenjen.', modalError: false});
            } catch (error) {
                if (error.response) {
                    openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});  
                } else {
                    // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                    openModal({showModal: true, modalMsg: error.message, modalError: true});
                }        
            }
        });        
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
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });    
            } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: error.message, modalError: true});
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }        
        }        
    }

    return {product, findId, resetForm, findProductSubmit, updateProductSubmit, setFindId, updatePropertyValue, axiosUpdateProductFromStripe};
}

export default useProductHandle;
