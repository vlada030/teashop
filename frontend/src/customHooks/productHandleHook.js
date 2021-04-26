import {useState} from 'react';
import axios from 'axios';
import {useGlobalContext} from '../context/global_context';
import {goToPagesTop} from '../utils/helpers';

const INIT_PRODUCT = {
    id: '',
    name: '',
    stock: 0,
    price: 0,
    category: '',
    package: ['30', '50', '100'],
    featured: false,
    stars: 5,
    reviews: 1,
    filter: [],
    images: [],
    description: [],
    preparation: [],
    goal: [],
    disclaimer: []
}

const useProductHandle = () => {

    const [product, setProduct] = useState(INIT_PRODUCT);
    const [findId, setFindId] = useState('');
    const {openModal, closeModal} = useGlobalContext();

    const resetForm = () => {
        setProduct(INIT_PRODUCT);
        closeModal();
        goToPagesTop();
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

        // translate images to array
        if (name === 'images' || name === 'filter') {
            let transformedToArr = value.split(',');
            return setProduct({...product, [name]: transformedToArr});
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
                goToPagesTop();   
            } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: error.message, modalError: true});
                goToPagesTop();
            }        
        }        
    }

    const createProductSubmit = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line
            const { data } = await axios({
                url: `/allproducts/create-product`,
                method: 'POST',
                data: product
            });
            //console.log(data);
            setProduct(INIT_PRODUCT);
            openModal({showModal: true, modalMsg: 'Proizvod uspešno kreiran.', modalError: false});
            
        } catch (error) {
            if (error.response) {
                openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});   
            } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: error.message, modalError: true});
            }        
        } finally {
            goToPagesTop();
        }
    } 

    return {product, findId, resetForm, findProductSubmit, updateProductSubmit, setFindId, updatePropertyValue, axiosUpdateProductFromStripe, createProductSubmit};
}

export default useProductHandle;
