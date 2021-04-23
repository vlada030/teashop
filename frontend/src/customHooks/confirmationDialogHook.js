import React, {useState, useCallback} from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';

export const useConfirmationDialog = ({
    headerText,
    bodyText,
    handleConfirm
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    const Dialog = useCallback(() => 
         <ConfirmationDialog 
                    headerText={headerText} 
                    bodyText={bodyText} 
                    handleCancel={() => setIsOpen(false)} 
                    handleConfirm={handleConfirm}
                    isOpen={isOpen} />
    , [isOpen])

    return {openModal, closeModal, Dialog};

}
