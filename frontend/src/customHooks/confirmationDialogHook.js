import React, {useState, useCallback} from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';

export const useConfirmationDialog = ({
    headerText,
    bodyText,
    handleConfirm
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);

    const closeDialog = () => setIsOpen(false);
  
    const Dialog = useCallback(() => 
         <ConfirmationDialog 
                    headerText={headerText} 
                    bodyText={bodyText} 
                    handleCancel={() => setIsOpen(false)} 
                    handleConfirm={handleConfirm}
                    isOpen={isOpen} />
    , [isOpen])

    return {openDialog, closeDialog, Dialog};
}
