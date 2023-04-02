import { type NextPage } from "next";
import {h, Fragment} from "preact"; 
import {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

const Page: NextPage = () => {
    let [currentNumber, setCurrentNumber] = useState(1);
    let localNumber = currentNumber;  
    const [sideLength, setSideLength] = useState(7);
    let [currentErrors, setCurrentErrors] = useState(0);
    

    function shuffledNumbers(last: number): number[] {
    const arr: number[] | undefined[] = [];
    for (let i = 1; i <= last; i++) {
        arr.push(i as never);
    }
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i] , arr[j]] = [arr[j], arr[i]];
    }
    return arr as number[];
    }

    const [numbers, changeNumbers] = useState(shuffledNumbers(sideLength * sideLength));
    
    const handleClick = (content: number) => { 
        if (content === localNumber || content === currentNumber){
            setCurrentNumber(prevNumber => prevNumber + 1);
            localNumber++;
            console.log('compared', currentNumber);
        }
        else{
            setCurrentErrors(prevErrors => prevErrors + 1);
            console.log(content,currentNumber);
        }
    };

    const Cell = (content: number): JSX.Element => {
        let className = 'h-20 w-20 flex items-center justify-center border border-zinc-800 border-2 rounded bg-gray-900';
    return(
            <button className={className} onClick={() => handleClick(content)}>
                <div className="text-center text-2xl text-white">{content}</div>
            </button>
        );
    };

    const generateCells = (): JSX.Element[] => {
        const cells: JSX.Element[] = numbers.map( n => {
            return Cell(n);
        });
        return cells;
    };

    const generateTable = (): JSX.Element => {
        return(
            <div className={`flex grid grid-cols-7 gap-1`}>
                {generateCells()}
            </div>
        );
    };
    const [table, setTable] = useState(generateTable());
    useEffect(() => { setTable(table); }, [table]);
    useEffect(() => {
        setCurrentNumber(localNumber)
        console.log('triggered')
    }, 
    [currentNumber, currentErrors, localNumber]);

    return(
        <>
            <Head>
                <title>Schulte Table</title>
                <meta name="Schulte Table" content="A speed reading game called Schulte Table" />
            </Head>
            <div className='text-3xl text-white'>
                <p>Errors: {currentErrors}</p>
                <p>Number: {currentNumber}</p>
            </div>
            <div className="flex justify-center h-screen items-center">
                {table}
            </div>
        </>
    );
};
export default Page;