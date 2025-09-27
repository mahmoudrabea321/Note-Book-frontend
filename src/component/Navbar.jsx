import React from 'react';
import { PlusIcon } from "lucide-react";
import { Link } from 'react-router'; 

export default function Navbar() {
  return (
    <div>
      <header>
        <div className='bg-base-300 w-full p-4'> 
          <div className='mx-auto max-w-4xl'> 
            <div className='flex items-center justify-between'> 
              <h1 className='text-xl text-red-50'>Jot </h1> 
              <div>
                <Link 
                 to='/create' 
                 className='btn btn-primary flex items-center gap-2 rounded-xl px-5 shadow-md hover:scale-105 transition-transform text-white'>
                  <PlusIcon className="size-5" /> 
                  <span>New Note</span>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}