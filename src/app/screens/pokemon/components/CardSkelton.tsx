export const CardSkelton = () => {
    const renderBoxes = () => {
      const boxArray = Array.from({ length: 15 }, (_, index) => (
        <div key={index} className='flex flex-col items-center w-60 h-80 border-8 rounded-lg animate-pulse' 
            style={{ borderColor: 'var(--loader)'
            }}>

                <div className='rounded-full w-28 h-28 mt-6 animate-pulse'
                    style={{ background: 'var(--loader)',
                }}>
                </div>

                <div className='flex gap-3 mt-4'>
                    <div className='w-20 h-3 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                    <div className='w-20 h-3 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                </div>

                <div className='flex gap-3 mt-4'>
                    <div className='w-20 h-16 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                    <div className='w-20 h-16 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                </div>

                <div className='flex gap-3 mt-4'>
                    <div className='w-20 h-3 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                    <div className='w-20 h-3 rounded-sm animate-pulse' style={{ background: 'var(--loader)'}}>
                    </div>
                </div>
        </div>
      ));
  
      return boxArray;
    };
  
    return <div className='flex items-center justify-center flex-wrap gap-6 p-5'>{renderBoxes()}</div>;
};