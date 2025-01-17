from core.tools.tool.builtin_tool import BuiltinTool
from core.tools.entities.tool_entities import ToolInvokeMessage

from pydantic import BaseModel, Field

from typing import Any, Dict, List, Union

from langchain import WikipediaAPIWrapper
from langchain.tools import WikipediaQueryRun

class WikipediaInput(BaseModel):
    query: str = Field(..., description="search query.")

class WikiPediaSearchTool(BuiltinTool):
    def _invoke(self, 
                user_id: str, 
               tool_parameters: Dict[str, Any], 
        ) -> Union[ToolInvokeMessage, List[ToolInvokeMessage]]:
        """
            invoke tools
        """
        query = tool_parameters.get('query', '')
        if not query:
            return self.create_text_message('Please input query')
        
        tool = WikipediaQueryRun(
            name="wikipedia",
            api_wrapper=WikipediaAPIWrapper(doc_content_chars_max=4000),
            args_schema=WikipediaInput
        )

        result = tool.run(tool_input={
            'query': query
        })

        return self.create_text_message(self.summary(user_id=user_id,content=result))
    