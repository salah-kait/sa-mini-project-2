package edu.miu.cs.cs590.miniproject1.Payload.Requests;

import java.util.List;

public interface SearchResult<T> {
	List<T> getResult();

	int getCount();
}
