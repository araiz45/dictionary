import React from 'react'
import { useState, useRef } from 'react'
const Form = () => {
    const [word, setWord] = useState('')
    const [para, setPara] = useState('')
    const [changingValue, setChangingValue] = useState('');
    const value = useRef('');

    const gettingValue = async (e) => {
        e.preventDefault()
        removeAllElements("innerContainer")
        let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + value.current.value)
        console.log(response)
        if (response.ok === false) {
            setPara("No such word exists, Correct spelling or try a new word");
            setWord("")
        } else {
            value.current.value = '';
            setPara('')
            let data = await response.json()
            if (data !== undefined) {
                setWord(data[0].word)
                // console.log(data)
                // eslint-disable-next-line 
                data[0].meanings.map((e) => {
                    console.log(e)
                    let div = document.createElement('div');
                    div.innerHTML = `<div class="">
                <h2 class="text-primary link-underline-primary">${e.partOfSpeech}</h2>
                <h5 class="">Defination</h5>
              </div>`
                    document.getElementById('innerContainer').appendChild(div);
                    // eslint-disable-next-line 
                    e.definitions.map((val) => {
                        let p = document.createElement('p');
                        p.innerHTML = `${val.definition}`
                        div.appendChild(p)
                    })
                    // eslint-disable-next-line 
                    if (e.synonyms.length > 0) {
                        let synonymsHeading = document.createElement('h5')
                        synonymsHeading.innerHTML = "Synonyms"
                        // synonymsHeading.setAttribute("class", "text-muted")
                        div.appendChild(synonymsHeading)
                    }
                    // eslint-disable-next-line 
                    e.synonyms.map((val) => {
                        let p = document.createElement('em');
                        p.innerHTML = `${val}, `
                        div.appendChild(p)
                    })
                    if (e.antonyms.length > 0) {
                        let antonymsHeading = document.createElement('h5')
                        antonymsHeading.innerHTML = "Antonyms"
                        // antonymsHeading.setAttribute('class', 'text-underline')
                        div.appendChild(antonymsHeading)
                    }
                    // eslint-disable-next-line 
                    e.antonyms.map((val) => {
                        let p = document.createElement('em');
                        p.innerHTML = `${val}, `
                        div.appendChild(p)
                    })
                })
            }
        }
    }


    const removeAllElements = (element) => {
        const parent = document.getElementById(element);
        parent.innerHTML = '';
    }
    const handleOnChange = (e) => {
        setChangingValue(e.target.value)
    }
    return (
        <>
            <div className='container'>
                <form>
                    <div className="d-flex justify-content-center gap-2 my-5">
                        <input type="text" className="form-control" id="input" aria-describedby="emailHelp" value={changingValue} ref={value} onChange={handleOnChange} style={{ width: '30rem' }} placeholder='Search word here'/>
                        <button type="submit" className="btn btn-danger" onClick={gettingValue}>Search</button>
                    </div>
                </form>
            </div>
            <div className='mb-5'>
                <div className='container' id='container'>
                    {word !== ''? <p className='h1 text-danger'>{word}</p>: ''}
                    <p className='text-center fw-bold'>{para}</p>
                    <div id="innerContainer">

                    </div>
                </div>
            </div>
        </>

    )
}

export default Form