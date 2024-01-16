import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

export default function SearchBar (){

    const [querypath, setQuerypath] = useState('')
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const search = searchParams.get('category')
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [search]);

    function handleSearch (term: string){
        const params = new URLSearchParams(searchParams)
        
        if (term) {
            params.set('model',term)
        } else {
            params.delete('model')
        }
        setQuerypath(`/product?${params.toString()}`)
    }
    
    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key === 'Enter'){
            event.preventDefault()
            replace(querypath)
        }
    }
    
    return(
        <div className="flex items-center justify-between w-full mx-4">
            <div className="relative flex items-center w-full">
                <input
                ref={inputRef}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                    placeholder="Buscar libro..."
                    onChange={(e)=>{
                        handleSearch(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    defaultValue={searchParams.get('query')?.toString()}>
                </input>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=".5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}