
export default function DeleteRecord ({loadingDelete, handelDelete, closeDeleteConfirmation}) {
    
        return(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">  
                    <div className="bg-white p-6 rounded-md shadow-lg">  
                        <h2 className="text-lg font-semibold mb-4">تأكيد الحذف</h2>  
                        <p className="mb-4">هل أنت متأكد أنك تريد حذف هذا العنصر؟</p>  
                        <div className="flex justify-between">  
                            <button  
                                type="button"
                                onClick={closeDeleteConfirmation}  
                                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"  
                            >  
                                إلغاء  
                            </button>  
                            <button  
                                onClick={handelDelete}  
                                disabled={loadingDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  
                            >  
                            {loadingDelete
                                ?   <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-6 h-6"></div>
                                :   "حذف"
                            }     
                            </button> 
                        </div>  
                    </div>  
                </div>  
        );
};