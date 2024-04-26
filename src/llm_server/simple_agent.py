from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAIChat

from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

from langchain.chains.conversation.memory import ConversationBufferWindowMemory

load_dotenv()

def ask_question(question: str) -> str:
    """
    TODO: 関数の説明の追加
    """
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, api_key=os.environ["OPENAI_API_KEY"])
    template = """Question: {question}

    Answer:"""

    prompt = PromptTemplate(template=template, input_variables=["question"])
    llm_chain = LLMChain(prompt=prompt, llm=llm)

    answer = llm_chain.run(question)
    return answer


def create_conversational_chain():
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, api_key=os.environ["OPENAI_API_KEY"])
    # TODO: プロンプト修正
    template = """。

    {chat_history}
    {input}
"""
    prompt = PromptTemplate(
        input_variables=["chat_history", "input"], template=template
    )
    memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history")
    chain = LLMChain(
        llm=llm,
        prompt=prompt,
        verbose=True,
        memory=memory,
    )

    return chain
